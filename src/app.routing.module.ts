import { AddressController } from "./controllers/address/address.controller";
import { TestController } from "./test/test.controller";

export const routes = [
  {
    path: "test",
    controller: TestController,
  },
  {
    path: "addresses",
    controller: AddressController,
  },
];
