import { Schema } from "mongoose";

export default {
  name: "UserInfo",
  schema: new Schema({
    uname: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username has been taken"],
    },
    passw: {
      type: String,
      required: [true, "Password is required."],
    },
    fullname: {
      type: String,
      required: [true, "Full Name is required."],
    },
  }),
};
