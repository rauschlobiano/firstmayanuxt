import { Schema } from "mongoose";

export default {
  name: "ItemSellTrans",
  schema: new Schema(
    {
      transno: {
        type: Number,
      },
      transdate: {
        type: String,
      },
      transstatus: {
        type: String,
      },
      pricecode: {
        type: String,
      },
      transtotal: {
        type: Number,
      },
      client: {
        type: Object,
      },
      transitems: {
        type: Array,
      },
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
