import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItempricesServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemPrice");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all items
  async getAllItemPrices() {
    return await this.model.find({});
  }

  //using item_id as parameter
  async getItemPriceByItemId(params: {}) {
    return await this.model.find(params);
  }

  //returns a specific item using the id
  async findItemPriceById(params: {}) {
    return await this.model.findOne(params);
  }

  //updates a single item and returns the updated item
  async updateItemPrice(body: {}, params: {}) {
    try {
      let res = await this.model.findOneAndUpdate(params, body, {
        useFindAndModify: false,
      });
      return { updated: true, resdata: res };
    } catch (ex) {
      console.log(ex);
      return { updated: false };
    }
  }
  //creates a new item
  async createNewItemPrice(body: {}) {
    try {
      let res = await this.model.create(body);
      return { created: true, resdata: res };
    } catch (ex) {
      console.log(ex);
      return { created: false };
    }
  }
  //deletes a single item
  async deleteItemPriceById(params: {}) {
    try {
      await this.model.deleteOne(params);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
