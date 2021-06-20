import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItempricesServices } from "../services/itemprices.service";

@Controller()
export class ItempricesController {
  constructor(private services: ItempricesServices) {}

  @Get("/specificprice/:item_id")
  async getItemSizePiece({ params }: MayaJsContext): Promise<any> {
    return await this.services.getItemPriceByItemId(params);
  }

  @Post()
  async createItemprices({ body }: MayaJsContext): Promise<any> {
    // Create a Itemprices
    body.editedBy = "Manual Name";
    body.createdBy = "Manual Name";
    //remove the id
    delete body._id;
    return await this.services.createNewItemPrice(body);
  }

  @Get()
  async readItemprices(): Promise<any> {
    // Read all Itemprices list
    return await this.services.getAllItemPrices();
  }

  @Get("/:_id")
  async readItempricesByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemprices by ID from list
    return await this.services.getItemPriceByItemId(params);
  }

  @Put("/:id")
  async replaceItemprices({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemprices from list
    return { message: "From ItempricesController PUT route", body, params };
  }

  @Patch("/:_id")
  async updateItemprices({ body, params }: MayaJsContext): Promise<any> {
    // Update Itemprices from list
    return await this.services.updateItemPrice(body, params);
  }

  @Delete("/:_id")
  async deleteItemprices({ params }: MayaJsContext): Promise<any> {
    // Delete Itemprices from list
    return await this.services.deleteItemPriceById(params);
  }
}
