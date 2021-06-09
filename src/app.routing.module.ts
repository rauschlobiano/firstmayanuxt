import { ItemsController } from "./controllers/items.controller";
import { PostransController } from "./controllers/postrans.controller";
import { TestController } from "./test/test.controller";

export const routes = [
  {
    path: "test",
    controller: TestController,
  },
  {
    path: "postrans",
    controller: PostransController,
  },
  {
    path: "items",
    controller: ItemsController,
  },
];
