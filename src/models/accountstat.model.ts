import { Schema } from "mongoose";

export default {
  name: "AccountStat",
  schema: new Schema({
    accountstatid: {
      type: Number,
      required: [true, "Account Status ID is required."],
    },
    accountstatdescrip: {
      type: String,
      required: [true, "Account Status Description is required."],
    },
  }),
};
