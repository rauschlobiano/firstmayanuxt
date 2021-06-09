import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { ProfileServices } from "./profile.service"

@Controller()
export class ProfileController {
  constructor(private services: ProfileServices) {}

  @Post()
  async createProfile({ body }: MayaJsContext): Promise<any> {
    // Create a Profile
    return { message: "From ProfileController POST route", body };
  }

  @Get()
  async readProfile(): Promise<any> {
    // Read all Profile list
    return { message: "From ProfileController GET route" };
  }

  @Get("/:id")
  async readProfileByID({ params }: MayaJsContext): Promise<any> {
    // Read Profile by ID from list
    return { message: "From ProfileController GET route with params ID", params };
  }

  @Put("/:id")
  async replaceProfile({ body, params }: MayaJsContext): Promise<any> {
    // Replace Profile from list
    return { message: "From ProfileController PUT route", body, params };
  }

  @Patch("/:id")
  async updateProfile({ body, params }: MayaJsContext): Promise<any> {
    // Update Profile from list
    return { message: "From ProfileController PATCH route", body, params };
  }

  @Delete("/:id")
  async deleteProfile({ params }: MayaJsContext): Promise<any> {
    // Delete Profile from list
    return { message: "From ProfileController DELETE route", params };
  }
}
