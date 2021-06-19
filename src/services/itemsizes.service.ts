import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemsizesServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemSize");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all item sizes
  async getAll() {
    return await this.model.find({});
  }
}
