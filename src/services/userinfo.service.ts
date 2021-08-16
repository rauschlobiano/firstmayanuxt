import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../environments";

const SALT_WORK_FACTOR = 10;

@Service()
export class UserinfoServices {
  get db() {
    return this.mongo.database("con1");
  }
  get model() {
    return this.db.instance.model("UserInfo");
  }

  constructor(private mongo: MongoDbServices) {}

  async register(body: { passw: any }) {
    console.log(body);

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    console.log(salt);
    body.passw = await bcrypt.hash(body.passw, salt);
    return await this.model.create(body);
  }

  async getUserInfo(body: { id: string; token: string }) {
    let userData = await this.model.findOne({ _id: body.id });

    if (userData) {
      //check if token is valid
      let good = jwt.verify(body.token, env.sekreto);
      return good;
      //   jwt.verify(body.token, env.sekreto, (err, authData) => {
      //     if (err) {
      //       return {
      //         status: "invalidtoken",
      //         message: "Not Authorized",
      //         userData: null,
      //       };
      //     } else {
      //       console.log("good token");

      //       return { status: "ok", message: "Authorized", authData, userData };
      //     }
      //   });
    }
  }

  async login(body: { uname: any; passw: any }) {
    let userInfo: any;

    const res = await this.model.findOne(
      { uname: body.uname },
      { uname: 1, fullname: 1, passw: 1 }
    );

    if (res) {
      userInfo = res;
      //get user data
      let { _id, passw, uname, fullname } = userInfo;

      //compare password
      const cmp = await bcrypt.compare(body.passw, passw);

      if (cmp) {
        //create token
        let token = jwt.sign({ data: userInfo.passw }, env.sekreto, {
          expiresIn: "30s",
        });

        return {
          status: "ok",
          message: "Successfully Logged-in",
          userData: { id: _id, uname, fullname, relax: token },
        };
      } else {
        return { status: "error", message: "Wrong password", userData: null };
      }
    } else {
      console.log("wrong");
      return {
        status: "error",
        message: "Wrong username and password",
        userData: null,
      };
    }
  }

  //functions
  checkTokenIfGoods(req: any, res: any, next: any) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    //check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      //get the actual value of the token
      const actualBearerValue = bearerHeader.split(" ")[1];
      //set the req token by the actual token value
      req.token = actualBearerValue;
      //proceed to request
      next();
    } else {
      //forbidden
      res.sendStatus(403);
    }
  }
}
