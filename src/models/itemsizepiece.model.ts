import { Schema } from "mongoose";

export default {
  name: "ItemSizePiece",
  schema: new Schema(
    {
      item_id: {
        type: String,
        required: [true, "Item ID is required."],
      },
      itemsize: {
        type: String,
        required: [true, "Item Size is required."],
      },

      pieces: {
        type: Number,
        required: [true, "Pieces is required."],
      },
      createdBy: {
        type: String,
        required: [true, "Created by is required."],
      },
      editedBy: {
        type: String,
        required: [true, "Edited by is required."],
      },
    },
    {
      timestamps: true,
    }
  ),
};
