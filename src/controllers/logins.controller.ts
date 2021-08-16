import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { LoginsServices } from "../services/logins.service";

@Controller()
export class LoginsController {
  constructor(private services: LoginsServices) {}

  @Post()
  async createLogins({ body }: MayaJsContext): Promise<any> {
    this.services.recordIpAddress(body);
  }

  @Get()
  async readLogins(): Promise<any> {
    // Read all Logins list
    return { message: "From LoginsController GET route" };
  }

  @Get("/:id")
  async readLoginsByID({ params }: MayaJsContext): Promise<any> {
    // Read Logins by ID from list
    return {
      message: "From LoginsController GET route with params ID",
      params,
    };
  }

  @Put("/:id")
  async replaceLogins({ body, params }: MayaJsContext): Promise<any> {
    // Replace Logins from list
    return { message: "From LoginsController PUT route", body, params };
  }

  @Patch("/:id")
  async updateLogins({ body, params }: MayaJsContext): Promise<any> {
    // Update Logins from list
    return { message: "From LoginsController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteLogins({ params }: MayaJsContext): Promise<any> {
    // Delete Logins from list
    return { message: "From LoginsController DELETE route", params };
  }
}
