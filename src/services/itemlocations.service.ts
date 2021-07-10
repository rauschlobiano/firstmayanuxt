import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemlocationsServices {
  get db() {
    return this.mongo.database("con1");
  }
  get model() {
    return this.db.instance.model("ItemLocation");
  }
  constructor(private mongo: MongoDbServices) {}

  async getAllItemLocations() {
    return await this.model.find({});
  }
}
