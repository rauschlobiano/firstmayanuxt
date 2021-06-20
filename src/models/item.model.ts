import { Schema } from "mongoose";

export default {
  name: "Item",
  schema: new Schema(
    {
      itemcode: {
        type: String,
        required: [true, "Item Code is required."],
      },
      itemdescrip: {
        type: String,
        required: [true, "Item Description is required."],
      },
      supplierprofid: {
        type: String,
        required: [true, "Supplier is required."],
      },
      active: {
        type: Boolean,
        required: [true, "Active is required."],
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
