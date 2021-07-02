import { Schema } from "mongoose";

export default {
  name: "ItemSellTrans",
  schema: new Schema(
    {
      transno: {
        type: Number,
      },
      transdate: {
        type: Date,
      },
      transstatus: {
        type: String,
      },
      pricecode: {
        type: String,
      },
      status: {
        type: String,
      },
      notes: {
        type: String,
      },
      transtotal: {
        type: Number,
      },
      client: {
        ref: "Profile",
        type: Schema.Types.ObjectId,
        required: [true, "Client must be provided."],
      },
      transitems: [
        {
          ref: "ItemSellTransItem",
          type: Schema.Types.ObjectId,
        },
      ],

      createdBy: {
        type: String,
      },
      editedBy: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  ),
};
