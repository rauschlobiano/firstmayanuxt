import { Schema } from "mongoose";

export default {
  name: "ItemLocation",
  schema: new Schema({
    location: {
      type: String,
      required: [true, "Location is required."],
    },
  }),
};
