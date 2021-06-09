import { Schema } from "mongoose";

export default {
  name: "Item",
  schema: new Schema({
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    created_at: {
      type: Date,
      required: [false, "Created at is required."],
    },
  }),
};
