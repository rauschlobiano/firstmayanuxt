import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { TestServices } from "./test.service";
import { MongoDbServices } from "@mayajs/mongo";

@Controller()
export class TestController {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Test");
  }
  constructor(private services: TestServices, private mongo: MongoDbServices) {}

  @Post()
  async createTest({ body }: MayaJsContext): Promise<any> {
    const res = await this.model.create(body);
    return res;
  }

  @Get()
  async readTest(): Promise<any> {
    // Read all Test list
    try {
      const tests = await this.model.find({});
      console.log(tests);
      return { message: tests };
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  @Get("/:id")
  @Get("/:id/:name")
  @Get("/:id/:name/:age")
  async readTestByID({ params }: MayaJsContext): Promise<any> {
    // Read Test by ID from list

    //return { message: "From TestController GET route with params ID", params };
    return this.services.testfunc();
  }

  @Put("/:id")
  async replaceTest({ body, params }: MayaJsContext): Promise<any> {
    // Replace Test from list
    return { message: "From TestController PUT route", body, params };
  }

  @Patch("/:id")
  async updateTest({ body, params }: MayaJsContext): Promise<any> {
    // Update Test from list
    return { message: "From TestController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteTest({ params }: MayaJsContext): Promise<any> {
    // Delete Test from list
    return { message: "From TestController DELETE route", params };
  }
}
