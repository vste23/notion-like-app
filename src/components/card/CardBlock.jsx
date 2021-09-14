import "./CardBlock.css";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { deleteElement, reorder, insertElement } from "../../common/utils";
import InnerCard from "../inner-card/InnerCard";
import { setBlocks } from "../../app/reducers/blocksReducer";
import uniqid from "uniqid";

const CardBlock = () => {
  const blocks = useSelector(
    (store) => store.blocks.parentBlocks,
    shallowEqual
  );
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let newBlocks = null;
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        blocks[sInd].blocks,
        source.index,
        destination.index
      );
      newBlocks = blocks.map((b, id) =>
        id === sInd
          ? {
              ...b,
              blocks: items,
            }
          : b
      );
    } else {
      // source editing
      const sItems = deleteElement(blocks[sInd].blocks, source.index);
      if (sItems.length < 1) {
        newBlocks = blocks.filter((b) => b.id !== blocks[sInd].id);
      } else {
        newBlocks = blocks.map((b, id) =>
          id === sInd
            ? {
                ...b,
                blocks: sItems,
              }
            : b
        );
      }

      // dest editing
      const destItems = insertElement(
        blocks[dInd].blocks,
        destination.index,
        blocks[sInd].blocks[source.index]
      );
      newBlocks = newBlocks.map((b, id) =>
        id === dInd
          ? {
              ...b,
              blocks: destItems,
            }
          : b
      );
    }

    dispatch(setBlocks(newBlocks));
  };

  const addNewBlock = () => {
    return dispatch(
      setBlocks([
        ...blocks,
        {
          id: uniqid(),
          blocks: [
            {
              id: uniqid(),
              text: [{ type: "paragraph", children: [{ text: "" }] }],
            },
          ],
        },
      ])
    );
  };

  const addNewChildBlock = (pId) => {
    const newBlocks = blocks.map((b) =>
      b.id === pId
        ? {
            ...b,
            blocks: [
              ...b.blocks,
              {
                id: uniqid(),
                text: [{ type: "paragraph", children: [{ text: "" }] }],
              },
            ],
          }
        : b
    );
    return dispatch(setBlocks(newBlocks));
  };

  const setTextValue = (pId, cId, text) => {
    const newBlocks = blocks.map((b) =>
      b.id === pId
        ? {
            ...b,
            blocks: b.blocks.map((bc) =>
              bc.id === cId
                ? {
                    ...bc,
                    text: text,
                  }
                : bc
            ),
          }
        : b
    );
    return dispatch(setBlocks(newBlocks));
  };

  return (
    <Card className={"main-wrap"}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={() => addNewBlock()}>
            <AddIcon />
          </IconButton>
        }
        title="Notion Like App"
      />
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          {blocks.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided) => (
                <Card
                  className={"parent-block"}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={"inner-button-wrap"}>
                    <IconButton
                      aria-label="settings"
                      className="sub-icon"
                      onClick={() => addNewChildBlock(el.id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  {el.blocks.map((b, i) => (
                    <InnerCard
                      key={b.id}
                      id={b.id}
                      index={i}
                      text={b.text}
                      setText={(text) => setTextValue(el.id, b.id, text)}
                    />
                  ))}
                  {provided.placeholder}
                </Card>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default CardBlock;
