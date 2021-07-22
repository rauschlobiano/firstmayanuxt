import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { IteminventoryServices } from "../services/iteminventory.service";

@Controller()
export class IteminventoryController {
  constructor(private services: IteminventoryServices) {}

  @Post()
  async createIteminventory({ body }: MayaJsContext): Promise<any> {
    // Create a Iteminventory
    return { message: "From IteminventoryController POST route", body };
  }

  @Post("inventorycount/:itemlocation")
  async getInventory({ params }: MayaJsContext) {
    return this.services.getAllItemInventory(params);
  }

  @Get()
  async readIteminventory(): Promise<any> {
    // Read all Iteminventory list
    return { message: "There is not get method yet." };
  }

  @Get("/:id")
  async readIteminventoryByID({ params }: MayaJsContext): Promise<any> {
    // Read Iteminventory by ID from list
    return {
      message: "From IteminventoryController GET route with params ID",
      params,
    };
  }
  @Get("/itemhistory/:itemcode/:itemlocation")
  async readIteminventoryByCode({ params }: MayaJsContext): Promise<any> {
    return this.services.getItemHistory(params);
  }

  @Put("/:id")
  async replaceIteminventory({ body, params }: MayaJsContext): Promise<any> {
    // Replace Iteminventory from list
    return { message: "From IteminventoryController PUT route", body, params };
  }

  @Patch("/:id")
  async updateIteminventory({ body, params }: MayaJsContext): Promise<any> {
    // Update Iteminventory from list
    return {
      message: "From IteminventoryController PATCH route",
      body,
      params,
    };
  }

  @Delete("/:id")
  async deleteIteminventory({ params }: MayaJsContext): Promise<any> {
    // Delete Iteminventory from list
    return { message: "From IteminventoryController DELETE route", params };
  }
}
