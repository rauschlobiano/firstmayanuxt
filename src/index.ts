import { configServer } from "@mayajs/core";
import { AppModule } from "./app.module";
import bodyParser from "body-parser";
import cors from "cors";

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

configServer(3333)
  .usePlugins([
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(corsOptions),
  ])
  .bootstrapModule(AppModule);
