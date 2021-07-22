import { IteminventoryController } from "./controllers/iteminventory.controller";
import { ItemlocationsController } from "./controllers/itemlocations.controller";
import { ItempricesController } from "./controllers/itemprices.controller";
import { ItemsController } from "./controllers/items.controller";
import { ItemselltransController } from "./controllers/itemselltrans.controller";
import { ItemsizepiecesController } from "./controllers/itemsizepieces.controller";
import { ItemsizesController } from "./controllers/itemsizes.controller";
import { ProfilesController } from "./controllers/profiles.controller";
import { TaggingsController } from "./controllers/taggings.controller";
import { UserinfoController } from "./controllers/userinfo.controller";

export const routes = [
  {
    path: "profiles",
    controller: ProfilesController,
  },
  {
    path: "items",
    controller: ItemsController,
  },
  {
    path: "taggings",
    controller: TaggingsController,
  },
  {
    path: "itemsizes",
    controller: ItemsizesController,
  },
  {
    path: "itemsizepieces",
    controller: ItemsizepiecesController,
  },
  {
    path: "itemprices",
    controller: ItempricesController,
  },
  {
    path: "itemselltrans",
    controller: ItemselltransController,
  },
  {
    path: "iteminventory",
    controller: IteminventoryController,
  },
  {
    path: "itemlocations",
    controller: ItemlocationsController,
  },
  {
    path: "userinfo",
    controller: UserinfoController,
  },
];
