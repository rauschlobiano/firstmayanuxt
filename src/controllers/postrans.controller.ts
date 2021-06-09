import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { PostransServices } from "./postrans.service";
import { MongoDbServices } from "@mayajs/mongo";

@Controller()
export class PostransController {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Postrans");
  }

  constructor(private services: PostransServices, private mongo: MongoDbServices) {}
 
  @Post()
  async createPostrans({ body }: MayaJsContext): Promise<any> {
    // Create a Postrans

    return { message: "From PostransController POST route", body };
  }

  @Get()
  async readPostrans(): Promise<any> {
    // Read all Postrans list
    return { message: "From PostransController GET route" };
  }

  @Get("/:id")
  async readPostransByID({ params }: MayaJsContext): Promise<any> {
    // Read Postrans by ID from list
    return {
      message: "From PostransController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replacePostrans({ body, params }: MayaJsContext): Promise<any> {
    // Replace Postrans from list
    return { message: "From PostransController PUT route", body, params };
  }

  @Patch("/:id")
  async updatePostrans({ body, params }: MayaJsContext): Promise<any> {
    // Update Postrans from list
    return { message: "From PostransController PATCH route", body, params };
  }

  @Delete("/:id")
  async deletePostrans({ params }: MayaJsContext): Promise<any> {
    // Delete Postrans from list
    return { message: "From PostransController DELETE route", params };
  }
}
