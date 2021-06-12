import { Schema } from "mongoose";

export default {
  name: "Pricecode",
  schema: new Schema({
    pricecodeid: {
      type: Number,
      required: [true, "Price Code ID is required."],
    },
    pricecodedescrip: {
      type: String,
      required: [true, "Price Code Description is required."],
    },
  }),
};
