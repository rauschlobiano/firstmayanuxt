import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemsizepiecesServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemSizePiece");
  }
  constructor(private mongo: MongoDbServices) {}

  async getItemSizePiece(params: {}) {
    return await this.model.find(params);
  }
}
