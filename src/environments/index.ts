import dotenv from "dotenv";
dotenv.config();

export default {
  production: false,
  mongo_conn: process.env.MONGO_CONN || "",
  PORT: process.env.PORT || 3333,
  sekreto: process.env.SEKRETO || "ETHYLALCOHOL",
};
