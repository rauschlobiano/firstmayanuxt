import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemselltransServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemSellTrans");
  }
  constructor(private mongo: MongoDbServices) {}

  async getalltransactions() {
    return await this.model.find({});
  }

  async getalltransactionslist() {
    return await this.model.find({}, { transno: 1, clientname: 1 });
  }

  async savetransaction(body: {}) {
    try {
      let res = await this.model.create(body);
      return { created: true, resdata: res };
    } catch (ex) {
      console.log(ex);
      return { created: true, resdata: ex };
    }
  }
}
