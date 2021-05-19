import dotenv from "dotenv";
dotenv.config();

export default {
  production: false,
  mongo_conn: process.env.MONGO_CONN || "",
};
