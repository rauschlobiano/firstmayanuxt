import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItempricesServices } from "../services/itemprices.service";

@Controller()
export class ItempricesController {
  constructor(private services: ItempricesServices) {}

  @Post()
  async createItemprices({ body }: MayaJsContext): Promise<any> {
    // Create a Itemprices
    return { message: "From ItempricesController POST route", body };
  }

  @Get()
  async readItemprices(): Promise<any> {
    // Read all Itemprices list
    return { message: "From ItempricesController GET route" };
  }

  @Get("/:id")
  async readItempricesByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemprices by ID from list
    return {
      message: "From ItempricesController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceItemprices({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemprices from list
    return { message: "From ItempricesController PUT route", body, params };
  }

  @Patch("/:id")
  async updateItemprices({ body, params }: MayaJsContext): Promise<any> {
    // Update Itemprices from list
    return { message: "From ItempricesController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteItemprices({ params }: MayaJsContext): Promise<any> {
    // Delete Itemprices from list
    return { message: "From ItempricesController DELETE route", params };
  }
}
