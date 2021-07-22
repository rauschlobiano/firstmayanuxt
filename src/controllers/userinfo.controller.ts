import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { UserinfoServices } from "../services/userinfo.service";

@Controller()
export class UserinfoController {
  constructor(private services: UserinfoServices) {}

  @Post()
  async createUserinfo({ body }: MayaJsContext): Promise<any> {
    // Create a Userinfo
    return { message: "From UserinfoController POST route", body };
  }
  @Post("/reg")
  async createUser({ body }: MayaJsContext): Promise<any> {
    return this.services.register(body);
  }
  @Post("/login")
  async loginUser({ body }: MayaJsContext): Promise<any> {
    return this.services.login(body);
  }

  @Get()
  async readUserinfo(): Promise<any> {
    // Read all Userinfo list
    return { message: "ataya" };
  }

  @Get("/:id")
  async readUserinfoByID({ params }: MayaJsContext): Promise<any> {
    // Read Userinfo by ID from list
    return {
      message: "From UserinfoController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceUserinfo({ body, params }: MayaJsContext): Promise<any> {
    // Replace Userinfo from list
    return { message: "From UserinfoController PUT route", body, params };
  }

  @Patch("/:id")
  async updateUserinfo({ body, params }: MayaJsContext): Promise<any> {
    // Update Userinfo from list
    return { message: "From UserinfoController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteUserinfo({ params }: MayaJsContext): Promise<any> {
    // Delete Userinfo from list
    return { message: "From UserinfoController DELETE route", params };
  }
}
