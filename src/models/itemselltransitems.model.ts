import { Schema } from "mongoose";

export default {
  name: "ItemSellTransItem",
  schema: new Schema(
    {
      itemcounter: {
        type: Number,
      },
      itemcode: {
        type: String,
      },
      itemdescrip: {
        type: String,
      },
      totalpieces: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      itemsize: {
        type: String,
      },
      size: {
        type: String,
      },
      priceeach: {
        type: Number,
      },
      totalcost: {
        type: Number,
      },
      totalcostdisplay: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  ),
};
