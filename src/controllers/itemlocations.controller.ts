import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemlocationsServices } from "../services/itemlocations.service";

@Controller()
export class ItemlocationsController {
  constructor(private services: ItemlocationsServices) {}

  @Post()
  async createItemlocations({ body }: MayaJsContext): Promise<any> {
    // Create a Itemlocations
    return { message: "From ItemlocationsController POST route", body };
  }

  @Get()
  async readItemlocations(): Promise<any> {
    // Read all Itemlocations list
    return this.services.getAllItemLocations();
  }

  @Get("/:id")
  async readItemlocationsByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemlocations by ID from list
    return {
      message: "From ItemlocationsController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceItemlocations({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemlocations from list
    return { message: "From ItemlocationsController PUT route", body, params };
  }

  @Patch("/:id")
  async updateItemlocations({ body, params }: MayaJsContext): Promise<any> {
    // Update Itemlocations from list
    return {
      message: "From ItemlocationsController PATCH route",
      body,
      params,
    };
  }

  @Delete("/:id")
  async deleteItemlocations({ params }: MayaJsContext): Promise<any> {
    // Delete Itemlocations from list
    return { message: "From ItemlocationsController DELETE route", params };
  }
}
