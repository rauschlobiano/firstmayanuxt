import { Module } from "@mayajs/core";
import { RouterModule } from "@mayajs/router";
import { routes } from "./app.routing.module";
import { AppController } from "./app.controller";
import { TestController } from "./test/test.controller";
import { TestServices } from "./test/test.service";
import { MongoDbModule, MongoDbServices } from "@mayajs/mongo";
import { mongoOptions } from "./datatabase/mongo";
import { AddressController } from "./controllers/address/address.controller";
import { AddressServices } from "./controllers/address/address.service";

@Module({
  declarations: [AppController, TestController, AddressController],
  imports: [RouterModule.forRoot(routes), MongoDbModule.forRoot(mongoOptions)],
  providers: [TestServices, MongoDbServices, AddressServices],
  bootstrap: AppController,
})
export class AppModule {}
