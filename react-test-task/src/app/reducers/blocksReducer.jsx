import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";

export const blocksSlice = createSlice({
  name: "blocks",
  initialState: {
    parentBlocks: [
      {
        id: uniqid(),
        blocks: [
          {
            id: uniqid(),
            text: [{type: "paragraph", children: [{text: "Just some dummy text 1 left here to showcase my ability to fetch data from Redux store according to test tasks requirements"}]}],
          },
          {
            id: uniqid(),
            text: [{type: "paragraph", children: [{text: "Just some dummy text 2 left here to showcase my ability to fetch data from Redux store according to test tasks requirements"}]}],
          },
        ],
      },
      {
        id: uniqid(),
        blocks: [
          {
            id: uniqid(),
            text: [{type: "paragraph", children: [{text: "Just some dummy text 3 left here to showcase my ability to fetch data from Redux store according to test tasks requirements"}]}],
          },
        ],
      },
    ],
  },
  reducers: {
    setBlocks: (state, action) => {
      state.parentBlocks = action.payload;
    },
  },
});

export const { setBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
