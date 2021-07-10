import { configServer } from "@mayajs/core";
import { AppModule } from "./app.module";
import bodyParser from "body-parser";
import cors from "cors";
import env from "./environments";

var corsOptions = {
  //origin: "*",
  origin: [
    "http://localhost:3000",
    "http://nuxtvue.s3-website-ap-southeast-1.amazonaws.com",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

configServer(Number(env.PORT))
  .usePlugins([
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(corsOptions),
  ])
  .bootstrapModule(AppModule);
