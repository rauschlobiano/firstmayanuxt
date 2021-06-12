import { Module } from "@mayajs/core";
import { RouterModule } from "@mayajs/router";
import { routes } from "./app.routing.module";
import { AppController } from "./app.controller";
import { MongoDbModule, MongoDbServices } from "@mayajs/mongo";
import { mongoOptions } from "./datatabase/mongo";
//controllers
import { ProfilesController } from "./controllers/profiles.controller";
import { ItemsController } from "./controllers/items.controller";
import { TaggingsController } from "./controllers/taggings.controller";
//services
import { ProfilesServices } from "./services/profiles.service";
import { ItemsServices } from "./services/items.service";
import { TaggingsServices } from "./services/taggings.service";

@Module({
  declarations: [
    AppController,
    ProfilesController,
    ItemsController,
    TaggingsController,
  ],
  imports: [RouterModule.forRoot(routes), MongoDbModule.forRoot(mongoOptions)],
  providers: [
    MongoDbServices,
    ProfilesServices,
    ItemsServices,
    TaggingsServices,
  ],
  bootstrap: AppController,
})
export class AppModule {}
