import { Schema } from "mongoose";

export default {
  name: "ItemSizePiece",
  schema: new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required."],
      },
      price: {
        type: Number,
        required: [true, "Price is required."],
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
