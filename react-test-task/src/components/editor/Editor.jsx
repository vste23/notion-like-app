import "./Editor.css";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Editor, Transforms, Text, createEditor } from "slate";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import { Range } from "slate";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

const CustomEditor = ({text, setText}) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate
      editor={editor}
      value={text}
      onChange={(v) => setText(v)}
      onDOMBeforeInput={(event: InputEvent) => {
        event.preventDefault();
        switch (event.inputType) {
          case "formatBold":
            return toggleFormat(editor, "bold");
          case "formatItalic":
            return toggleFormat(editor, "italic");
          case "formatUnderline":
            return toggleFormat(editor, "underline");
          default:
            return null;
        }
      }}
    >
      <HoveringToolbar />
      <Editable
        className={"editor"}
        placeholder="Enter some text..."
        renderLeaf={(props) => <Leaf {...props} />}
      />
    </Slate>
  );
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const { selection } = editor;

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Paper ref={ref} className={"st-toolbar"}>
      <ToggleButtonGroup
        aria-label="text formatting"
        onChange={(event, newFormats) => {
          toggleFormat(editor, newFormats);
        }}
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default CustomEditor;
