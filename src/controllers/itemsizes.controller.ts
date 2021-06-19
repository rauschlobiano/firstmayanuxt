import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemsizesServices } from "../services/itemsizes.service";

@Controller()
export class ItemsizesController {
  constructor(private services: ItemsizesServices) {}

  @Get()
  async readItemsizes(): Promise<any> {
    // Read all Itemsizes list
    return await this.services.getAll();
  }

  @Post()
  async createItemsizes({ body }: MayaJsContext): Promise<any> {
    // Create a Itemsizes
    return { message: "From ItemsizesController POST route", body };
  }

  @Get("/:id")
  async readItemsizesByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemsizes by ID from list
    return {
      message: "From ItemsizesController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceItemsizes({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemsizes from list
    return { message: "From ItemsizesController PUT route", body, params };
  }

  @Patch("/:id")
  async updateItemsizes({ body, params }: MayaJsContext): Promise<any> {
    // Update Itemsizes from list
    return { message: "From ItemsizesController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteItemsizes({ params }: MayaJsContext): Promise<any> {
    // Delete Itemsizes from list
    return { message: "From ItemsizesController DELETE route", params };
  }
}
