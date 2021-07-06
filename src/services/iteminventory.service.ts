import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class IteminventoryServices {
  get db() {
    return this.mongo.database("con1");
  }
  get transItems() {
    return this.db.instance.model("ItemSellTransItem");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all items
  async getAllItemInventory() {
    return await this.transItems.aggregate([
      {
        $group: {
          _id: "$itemcode",
          itemdescrip: { $first: "$itemdescrip" },
          totalpieces: { $sum: "$totalinventory" },
        },
      },
      { $sort: { itemdescrip: 1 } },
    ]);
  }
  //get history of an item
  async getItemHistory(params: {}) {
    return await this.transItems.find(params);
  }
}
