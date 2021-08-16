import { Schema } from "mongoose";

export default {
  name: "Login",
  schema: new Schema(
    {
      uname: {
        type: String,
      },
      publicIP: {
        type: String,
      },
      logType: {
        type: String,
      },
      status: {
        type: Boolean,
      },
    },
    {
      timestamps: true,
    }
  ),
};
