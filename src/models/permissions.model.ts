import { Schema } from "mongoose";

export default {
  name: "Permission",
  schema: new Schema(
    {
      profiles: [],
      items: [],
    },
    {
      timestamps: true,
    }
  ),
};
