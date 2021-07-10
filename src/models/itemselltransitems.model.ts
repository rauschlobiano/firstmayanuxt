import { Schema } from "mongoose";

export default {
  name: "ItemSellTransItem",
  schema: new Schema(
    {
      item_id: {
        type: String,
      },
      itemcounter: {
        type: Number,
      },
      itemcode: {
        type: String,
      },
      transdate: {
        type: Date,
      },
      itemlocation: {
        type: String,
      },
      itemdescrip: {
        type: String,
      },
      totalpieces: {
        type: Number,
      },
      totalinventory: {
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
