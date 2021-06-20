import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class ItemsizepiecesServices {
  get model() {
    const db = this.mongo.database("con1");
    return db.instance.model("ItemSizePiece");
  }
  constructor(private mongo: MongoDbServices) {}

  //returns all items
  async getAllItemSizePieces() {
    return await this.model.find({});
  }

  //returns a specific item using the id
  async findItemSizePieceById(params: {}) {
    return await this.model.findOne(params);
  }

  async getItemSizePiece(params: {}) {
    return await this.model.find(params);
  }

  //updates a single item and returns the updated item
  async updateItemSizePiece(body: {}, params: {}) {
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
  async createNewItemSizePiece(body: {}) {
    try {
      let res = await this.model.create(body);

      return { created: true, resdata: res };
    } catch (ex) {
      console.log(ex);
      return { created: false };
    }
  }
  //deletes a single item
  async deleteItemSizePieceById(params: {}) {
    try {
      await this.model.deleteOne(params);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
