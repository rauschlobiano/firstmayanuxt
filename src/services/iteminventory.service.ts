import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class IteminventoryServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemSellTransItem");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all items
  async getAllItemInventory(body: {}) {
    console.log(body);
    let maxdate = {};
    return await this.model.aggregate([
      {
        $group: {
          _id: "$itemcode",
          itemdescrip: { $first: "$itemdescrip" },
          totalpieces: { $sum: "$totalpieces" },
        },
      },
    ]);
  }
}
