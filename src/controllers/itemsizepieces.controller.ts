import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ItemsizepiecesServices } from "../services/itemsizepieces.service";

@Controller()
export class ItemsizepiecesController {
  constructor(private services: ItemsizepiecesServices) {}

  @Get("/:_id")
  async readItemsizepiecesByID({ params }: MayaJsContext): Promise<any> {
    // Read Itemsizepieces by ID from list
    return await this.services.findItemSizePieceById(params);
  }

  @Patch("/:_id")
  async updateItemsizepieces({ body, params }: MayaJsContext): Promise<any> {
    return await this.services.updateItemSizePiece(body, params);
  }

  @Get()
  async readItemsizepieces(): Promise<any> {
    return await this.services.getAllItemSizePieces();
  }

  @Get("/specificsizepiece/:item_id")
  async getItemSizePiece({ params }: MayaJsContext): Promise<any> {
    return await this.services.getItemSizePiece(params);
  }

  @Post()
  async createItemsizepieces({ body }: MayaJsContext): Promise<any> {
    // Create a Itemsizepieces
    body.editedBy = "Manual Name";
    body.createdBy = "Manual Name";
    //remove the id
    delete body._id;
    return await this.services.createNewItemSizePiece(body);
  }

  @Put("/:id")
  async replaceItemsizepieces({ body, params }: MayaJsContext): Promise<any> {
    // Replace Itemsizepieces from list
    return { message: "From ItemsizepiecesController PUT route", body, params };
  }

  @Delete("/:_id")
  async deleteItemsizepieces({ params }: MayaJsContext): Promise<any> {
    // Delete Itemsizepieces from list
    return this.services.deleteItemSizePieceById(params);
  }
}
