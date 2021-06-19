import { Schema } from "mongoose";

export default {
  name: "ItemPrice",
  schema: new Schema(
    {
      item_id: {
        type: String,
        required: [true, "Item ID is required."],
      },
      pricecode: {
        type: String,
        required: [true, "Price Code is required."],
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
