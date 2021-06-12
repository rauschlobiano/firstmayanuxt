import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Controller } from "@mayajs/core";
import { TaggingsServices } from "../services/taggings.service";

@Controller()
export class TaggingsController {
  constructor(private services: TaggingsServices) {}

  @Get("/genders")
  async genders(): Promise<any> {
    return await this.services.getGenders();
  }
  @Get("/accountstats")
  async accountstats(): Promise<any> {
    return await this.services.getAccountStats();
  }
  @Get("/proftypes")
  async proftypes(): Promise<any> {
    return await this.services.getProftypes();
  }
  @Get("/profgroups")
  async profgroups(): Promise<any> {
    return await this.services.getProfgroups();
  }
  @Get("/pricecodes")
  async pricecodes(): Promise<any> {
    return await this.services.getPricecodes();
  }
}
