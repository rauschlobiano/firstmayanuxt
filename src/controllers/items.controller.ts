import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemsServices } from "../services/items.service";
import { MongoDbServices } from "@mayajs/mongo";

@Controller()
export class ItemsController {
  constructor(private services: ItemsServices) {}

  @Post()
  async createItems({ body }: MayaJsContext): Promise<any> {
    body.editedBy = "Me haha";
    body.createdBy = "Me haha";
    return this.services.createNew(body);
  }

  @Get()
  async readItems(): Promise<any> {
    //return this.testservices.testfunc();
    return this.services.getAll();
  }

  @Get("/:_id")
  async readItemsByID({ params }: MayaJsContext): Promise<any> {
    return await this.services.findById(params);
  }

  @Patch("/:_id")
  async updateItems({ body, params }: MayaJsContext): Promise<any> {
    body.editedBy = "Me again";
    return await this.services.findUpdate(body, params);
  }

  @Delete("/:_id")
  async deleteItems({ params }: MayaJsContext): Promise<any> {
    return await this.services.deleteById(params);
  }
}
