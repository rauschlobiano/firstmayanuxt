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
import { ItemsizesController } from "./controllers/itemsizes.controller";
import { ItemsizepiecesServices } from "./services/itemsizepieces.service";
//services
import { ProfilesServices } from "./services/profiles.service";
import { ItemsServices } from "./services/items.service";
import { TaggingsServices } from "./services/taggings.service";
import { ItemsizesServices } from "./services/itemsizes.service";
import { ItemsizepiecesController } from "./controllers/itemsizepieces.controller";
import { ItempricesController } from "./controllers/itemprices.controller";
import { ItempricesServices } from "./services/itemprices.service";
import { ItemselltransController } from "./controllers/itemselltrans.controller";
import { ItemselltransServices } from "./services/itemselltrans.service";
import { IteminventoryController } from "./controllers/iteminventory.controller";
import { IteminventoryServices } from "./services/iteminventory.service";

@Module({
  declarations: [
    AppController,
    ProfilesController,
    ItemsController,
    TaggingsController,
    ItemsizesController,
    ItemsizepiecesController,
    ItempricesController,
    ItemselltransController,
    IteminventoryController,
  ],
  imports: [RouterModule.forRoot(routes), MongoDbModule.forRoot(mongoOptions)],
  providers: [
    MongoDbServices,
    ProfilesServices,
    ItemsServices,
    TaggingsServices,
    ItemsizesServices,
    ItemsizepiecesServices,
    ItempricesServices,
    ItemselltransServices,
    IteminventoryServices,
  ],
  bootstrap: AppController,
})
export class AppModule {}
