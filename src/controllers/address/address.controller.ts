import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { AddressServices } from "./address.service";
import addressModel from "../../models/address.model";
import { MongoDbServices } from "@mayajs/mongo";

@Controller()
export class AddressController {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Address");
  }

  constructor(
    private services: AddressServices,
    private mongo: MongoDbServices
  ) {}

  @Post()
  async createAddress({ body }: MayaJsContext): Promise<any> {
    // Create a Address
    return { message: "From AddressController POST route", body };
  }

  @Get()
  async readAddress(): Promise<any> {
    try {
      const tests = await this.model.find({});
      console.log(tests);
      return tests;
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  @Get("/:id")
  async readAddressByID({ params }: MayaJsContext): Promise<any> {
    try {
      let res = await this.model.findOne({ _id: params.id });
      console.log(res);
      return {
        message: res,
        params,
      };
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  @Put("/:id")
  async replaceAddress({ body, params }: MayaJsContext): Promise<any> {
    try {
      body._id = params.id;
      let res = await this.model.findOneAndReplace(body);

      console.log(res);
      return {
        message: res,
        params,
        body,
      };
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  @Patch("/:id")
  async updateAddress({ body, params }: MayaJsContext): Promise<any> {
    try {
      body._id = params.id;
      let res = await this.model.updateOne(body);

      console.log(res);
      return {
        message: res,
        params,
        body,
      };
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  @Delete("/:id")
  async deleteAddress({ params }: MayaJsContext): Promise<any> {
    // Delete Address from list
    return { message: "From AddressController DELETE route", params };
  }
}
