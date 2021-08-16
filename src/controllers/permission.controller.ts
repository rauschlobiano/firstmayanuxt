import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { PermissionServices } from "../services/permission.service";

@Controller()
export class PermissionController {
  constructor(private services: PermissionServices) {}

  @Post()
  async createPermission({ body }: MayaJsContext): Promise<any> {
    // Create a Permission
    return { message: "From PermissionController POST route", body };
  }

  @Get()
  async readPermission(): Promise<any> {
    // Read all Permission list
    return { message: "From PermissionController GET route" };
  }

  @Get("/:id")
  async readPermissionByID({ params }: MayaJsContext): Promise<any> {
    // Read Permission by ID from list
    return {
      message: "From PermissionController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replacePermission({ body, params }: MayaJsContext): Promise<any> {
    // Replace Permission from list
    return { message: "From PermissionController PUT route", body, params };
  }

  @Patch("/:id")
  async updatePermission({ body, params }: MayaJsContext): Promise<any> {
    // Update Permission from list
    return { message: "From PermissionController PATCH route", body, params };
  }

  @Delete("/:id")
  async deletePermission({ params }: MayaJsContext): Promise<any> {
    // Delete Permission from list
    return { message: "From PermissionController DELETE route", params };
  }
}
