import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemsServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("Item");
  }
  constructor(private mongo: MongoDbServices) {}

  async getAll() {
    try {
      const tests = await this.model.find({});
      console.log(tests);
      return { message: tests };
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }
  async createNew(body: {}) {
    return await this.model.create(body);
  }
}
