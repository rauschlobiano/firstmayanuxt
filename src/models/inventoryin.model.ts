import { Schema } from "mongoose";

export default {
  name: "InventoryIn",
  schema: new Schema({
    itemcounter: Number,
    itemcode: String,
    itemdescrip: String,
    totalpieces: Number,
    quantity: Number,
    itemsize: String,
    size: String,
    priceeach: Number,
    totalcost: Number,
    totalcostdisplay: String,
  }),
};
