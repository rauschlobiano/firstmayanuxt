import { Schema } from "mongoose";

export default {
  name: "Test",
  schema: new Schema({
    name: {
      type: String,
      required: [true, "First name is required."],
    },
  }),
};
