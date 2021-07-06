import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { InventoryinServices } from "../services/inventoryin.service";

@Controller()
export class InventoryinController {
  constructor(private services: InventoryinServices) {}

  @Post()
  async createInventoryin({ body }: MayaJsContext): Promise<any> {
    // Create a Inventoryin
    return { message: "From InventoryinController POST route", body };
  }

  @Get()
  async readInventoryin(): Promise<any> {
    // Read all Inventoryin list
    return { message: "From InventoryinController GET route" };
  }

  @Get("/:id")
  async readInventoryinByID({ params }: MayaJsContext): Promise<any> {
    // Read Inventoryin by ID from list
    return {
      message: "From InventoryinController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceInventoryin({ body, params }: MayaJsContext): Promise<any> {
    // Replace Inventoryin from list
    return { message: "From InventoryinController PUT route", body, params };
  }

  @Patch("/:id")
  async updateInventoryin({ body, params }: MayaJsContext): Promise<any> {
    // Update Inventoryin from list
    return { message: "From InventoryinController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteInventoryin({ params }: MayaJsContext): Promise<any> {
    // Delete Inventoryin from list
    return { message: "From InventoryinController DELETE route", params };
  }
}
