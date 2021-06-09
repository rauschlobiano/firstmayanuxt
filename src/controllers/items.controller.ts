import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemsServices } from "../services/items.service";
import { TestServices } from "../test/test.service";
import { MongoDbServices } from "@mayajs/mongo";

@Controller()
export class ItemsController {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Item");
  }
  constructor(
    private services: ItemsServices,
    private testservices: TestServices,
    private mongo: MongoDbServices
  ) {}

  @Post()
  async createItems({ body }: MayaJsContext): Promise<any> {
    return await this.model.create(body);
    //return this.services.createNew(body);
  }

  @Get()
  async readItems(): Promise<any> {
    //return this.testservices.testfunc();
    return this.services.getAll();
  }

  @Get("/:id")
  async readItemsByID({ params }: MayaJsContext): Promise<any> {
    // Read Items by ID from list
    return { message: "From ItemsController GET route with params ID", params };
  }

  @Put("/:id")
  async replaceItems({ body, params }: MayaJsContext): Promise<any> {
    // Replace Items from list
    return { message: "From ItemsController PUT route", body, params };
  }

  @Patch("/:id")
  async updateItems({ body, params }: MayaJsContext): Promise<any> {
    // Update Items from list
    return { message: "From ItemsController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteItems({ params }: MayaJsContext): Promise<any> {
    // Delete Items from list
    return { message: "From ItemsController DELETE route", params };
  }
}
