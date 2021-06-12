import { Schema } from "mongoose";

export default {
  name: "Proftype",
  schema: new Schema({
    proftypeid: {
      type: Number,
      required: [true, "Profile Type ID is required."],
    },
    proftypedescrip: {
      type: String,
      required: [true, "Profile Type Description is required."],
    },
  }),
};
