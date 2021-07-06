import { Schema } from "mongoose";

export default {
  name: "ItemInventory",
  schema: new Schema({
    itemcode: String,
    itemdescrip: String,
    totalpieces: Number,
  }),
};
