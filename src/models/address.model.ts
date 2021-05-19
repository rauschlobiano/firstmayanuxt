import { Schema } from "mongoose";

export default {
  name: "Address",
  schema: new Schema({
    name: {
      type: String,
      required: [true, "Name is required."],
    },
  }),
};
