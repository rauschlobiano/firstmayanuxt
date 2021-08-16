import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class LoginsServices {
  get db() {
    return this.mongo.database("con1");
  }
  get model() {
    return this.db.instance.model("Login");
  }

  constructor(private mongo: MongoDbServices) {}

  async recordIpAddress(body: {}) {
    this.model.create(body);
  }
}
