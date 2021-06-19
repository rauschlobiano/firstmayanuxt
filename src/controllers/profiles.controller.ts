import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ProfilesServices } from "../services/profiles.service";

@Controller()
export class ProfilesController {
  constructor(private services: ProfilesServices) {}

  @Get()
  async readItems(): Promise<any> {
    return this.services.getAll();
  }

  @Get("/:_id")
  async readItemsByID({ params }: MayaJsContext): Promise<any> {
    return await this.services.findById(params);
  }
  @Get("/suppliers")
  async getAllSuppliers({ params }: MayaJsContext): Promise<any> {
    //98 is supplier
    return await this.services.getAllSuppliers();
  }

  @Post()
  async createItems({ body }: MayaJsContext): Promise<any> {
    body.editedBy = "Me haha";
    body.createdBy = "Me haha";
    delete body._id;
    let newlycreated = this.services.createNew(body);
    return { message: "success", data: newlycreated };
  }

  @Patch("/:_id")
  async updateItems({ body, params }: MayaJsContext): Promise<any> {
    body.editedBy = "Me again";
    return await this.services.findUpdate(body, params);
  }

  @Delete("/:_id")
  async deleteItems({ params }: MayaJsContext): Promise<any> {
    return await this.services.deleteById(params);
  }
}
