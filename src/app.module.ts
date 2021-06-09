import { Module } from "@mayajs/core";
import { RouterModule } from "@mayajs/router";
import { routes } from "./app.routing.module";
import { AppController } from "./app.controller";
import { MongoDbModule, MongoDbServices } from "@mayajs/mongo";
import { mongoOptions } from "./datatabase/mongo";
//controllers
import { PostransController } from "./controllers/postrans.controller";
import { ItemsController } from "./controllers/items.controller";
//services
import { PostransServices } from "./controllers/postrans.service";
import { ItemsServices } from "./services/items.service";

@Module({
  declarations: [AppController, PostransController, ItemsController],
  imports: [RouterModule.forRoot(routes), MongoDbModule.forRoot(mongoOptions)],
  providers: [MongoDbServices, PostransServices, ItemsServices],
  bootstrap: AppController,
})
export class AppModule {}
