import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class InventoryinServices {
  get db() {
    return this.mongo.database("con1");
  }
  get model() {
    return this.db.instance.model("ItemSellTransItem");
  }
  constructor(private mongo: MongoDbServices) {}

  async createNew(body: {}) {
    return await this.model.create(body);
  }
}
