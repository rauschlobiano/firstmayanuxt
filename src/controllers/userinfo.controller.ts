import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { MayaJsContext } from "@mayajs/router";
import { Controller } from "@mayajs/core";
import { UserinfoServices } from "../services/userinfo.service";
import { LoginsServices } from "../services/logins.service";
import publicIp from "public-ip";
import os from "os";

@Controller()
export class UserinfoController {
  constructor(
    private services: UserinfoServices,
    private loginservice: LoginsServices
  ) {}

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
    console.log(os.hostname());
    console.log(os.platform());
    // const id = await getHWID();
    // console.log(id);

    body.status = false;
    body.logType = "login";
    await publicIp.v4().then((ip) => (body.publicIP = ip));

    let attempt = await this.services.login(body);
    //record the login attempt
    if (attempt?.status === "ok") body.status = true;
    await this.loginservice.recordIpAddress(body);

    return attempt;
  }

  @Post("/logout")
  async logoutUser({ body }: MayaJsContext): Promise<any> {
    console.log(body);

    body.status = true;
    body.logType = "logout";
    await publicIp.v4().then((ip) => (body.publicIP = ip));

    await this.loginservice.recordIpAddress(body);

    return { message: "logout" };
  }

  @Post("/getuser")
  async readUserinfo({ body }: MayaJsContext): Promise<any> {
    return this.services.getUserInfo(body);
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
