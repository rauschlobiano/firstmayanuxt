import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemsizepiecesServices } from "../services/itemsizepieces.service";

@Controller()
export class ItemsizepiecesController {
  constructor(private services: ItemsizepiecesServices) {}

  @Get("/:item_id")
  async getItemSizePiece({ params }: MayaJsContext): Promise<any> {
    return await this.services.getItemSizePiece(params);
  }

  @Post()
  async createItemsizepieces({ body }: MayaJsContext): Promise<any> {
    // Create a Itemsizepieces
    return { message: "From ItemsizepiecesController POST route", body };
  }

  @Get()
  async readItemsizepieces(): Promise<any> {
    // Read all Itemsizepieces list
    return { message: "From ItemsizepiecesController GET route" };
  }

  @Get("/:id")
  async readItemsizepiecesByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemsizepieces by ID from list
    return {
      message: "From ItemsizepiecesController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceItemsizepieces({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemsizepieces from list
    return { message: "From ItemsizepiecesController PUT route", body, params };
  }

  @Patch("/:id")
  async updateItemsizepieces({ body, params }: MayaJsContext): Promise<any> {
    // Update Itemsizepieces from list
    return {
      message: "From ItemsizepiecesController PATCH route",
      body,
      params,
    };
  }

  @Delete("/:id")
  async deleteItemsizepieces({ params }: MayaJsContext): Promise<any> {
    // Delete Itemsizepieces from list
    return { message: "From ItemsizepiecesController DELETE route", params };
  }
}
