import { ItemsController } from "./controllers/items.controller";
import { PostransController } from "./controllers/postrans.controller";

export const routes = [
  {
    path: "postrans",
    controller: PostransController,
  },
  {
    path: "items",
    controller: ItemsController,
  },
];
