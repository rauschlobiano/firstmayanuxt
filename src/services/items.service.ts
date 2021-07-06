import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemsServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Item");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all items
  async getAll() {
    return await this.model.find({}).sort({ _id: -1 });
  }

  //creates a new item
  async createNew(body: {}) {
    return await this.model.create(body);
  }

  //returns a specific item using the id
  async findById(params: {}) {
    return await this.model.findOne(params);
  }

  //updates a single item and returns the updated item
  async findUpdate(body: {}, params: {}) {
    let res = await this.model.findOneAndUpdate(params, body, {
      useFindAndModify: false,
    });
    let updated = await this.model.findOne(params);
    return updated;
  }

  //deletes a single item
  async deleteById(params: {}) {
    return await this.model.deleteOne(params);
  }
}
