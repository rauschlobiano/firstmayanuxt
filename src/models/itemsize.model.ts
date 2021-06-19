import { Schema } from "mongoose";

export default {
  name: "ItemSize",
  schema: new Schema({
    itemsizeid: {
      type: Number,
      required: [true, "Item Size ID is required."],
    },
    itemsizedescrip: {
      type: String,
      required: [true, "Item Size Description is required."],
    },
    defaultpieces: {
      type: Number,
      required: [true, "Default Pieces is required."],
    },
  }),
};
