import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";
import bcrypt from "bcryptjs";
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

  async login(body: { uname: any; passw: any }) {
    console.log(body);

    let kayama: any = {};
    const res = await this.model.find({ uname: body.uname }, { passw: 1 });
    console.log(res);

    if (res.length > 0) {
      kayama = res[0];
      const cmp = await bcrypt.compare(body.passw, kayama["passw"]);
      console.log(cmp);
      if (cmp) {
        return { message: "Success", userData: kayama };
      } else {
        return { message: "Wrong password", userData: null };
      }
    } else {
      return {
        message: "Wrong credentials",
        userData: null,
      };
    }
  }
}
