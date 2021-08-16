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
import { UserinfoController } from "./controllers/userinfo.controller";
import { ItemlocationsController } from "./controllers/itemlocations.controller";
import { ItemsizepiecesController } from "./controllers/itemsizepieces.controller";
import { ItempricesController } from "./controllers/itemprices.controller";
import { IteminventoryController } from "./controllers/iteminventory.controller";
import { ItemselltransController } from "./controllers/itemselltrans.controller";
import { LoginsController } from "./controllers/logins.controller";
import { PermissionController } from "./controllers/permission.controller";
//services
import { ProfilesServices } from "./services/profiles.service";
import { ItemsServices } from "./services/items.service";
import { TaggingsServices } from "./services/taggings.service";
import { ItemsizesServices } from "./services/itemsizes.service";
import { ItempricesServices } from "./services/itemprices.service";
import { ItemselltransServices } from "./services/itemselltrans.service";
import { IteminventoryServices } from "./services/iteminventory.service";
import { ItemlocationsServices } from "./services/itemlocations.service";
import { UserinfoServices } from "./services/userinfo.service";
import { LoginsServices } from "./services/logins.service";
import { PermissionServices } from "./services/permission.service";

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
    ItemlocationsController,
    UserinfoController,
    LoginsController,
    PermissionController,
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
    ItemlocationsServices,
    UserinfoServices,
    LoginsServices,
    PermissionServices,
  ],
  bootstrap: AppController,
})
export class AppModule {}
