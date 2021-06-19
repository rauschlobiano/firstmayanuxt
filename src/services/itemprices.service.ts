import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItempricesServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemPrice");
  }
  constructor(private mongo: MongoDbServices) {}

  async getItemPrice(params: {}) {
    return await this.model.find(params);
  }
}
