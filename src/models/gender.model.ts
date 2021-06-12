import { Schema } from "mongoose";

export default {
  name: "Gender",
  schema: new Schema({
    genderid: {
      type: Number,
      required: [true, "Gender ID is required."],
    },
    genderdescrip: {
      type: String,
      required: [true, "Gender Description is required."],
    },
  }),
};
