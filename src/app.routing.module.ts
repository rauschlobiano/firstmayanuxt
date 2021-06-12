import { ItemsController } from "./controllers/items.controller";
import { ProfilesController } from "./controllers/profiles.controller";
import { TaggingsController } from "./controllers/taggings.controller";

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
];
