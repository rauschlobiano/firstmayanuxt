import { Schema } from "mongoose";

export default {
  name: "Profgroup",
  schema: new Schema({
    proftypeid: {
      type: Number,
      required: [true, "Profile Group ID is required."],
    },
    proftypedescrip: {
      type: String,
      required: [true, "Profile Group Description is required."],
    },
  }),
};
