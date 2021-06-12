import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";

@Service()
export class TaggingsServices {
  get genderModel() {
    const db = this.mongo.database("con1");
    return db.instance.model("Gender");
  }
  get accountStatModel() {
    const db = this.mongo.database("con1");
    return db.instance.model("AccountStat");
  }
  get profTypeModel() {
    const db = this.mongo.database("con1");
    return db.instance.model("Proftype");
  }
  get profGroupModel() {
    const db = this.mongo.database("con1");
    return db.instance.model("Profgroup");
  }
  get priceCodeModel() {
    const db = this.mongo.database("con1");
    return db.instance.model("Pricecode");
  }
  constructor(private mongo: MongoDbServices) {}

  async getGenders() {
    return await this.genderModel.find({});
  }

  async getAccountStats() {
    return await this.accountStatModel.find({});
  }

  async getProftypes() {
    return await this.profTypeModel.find({});
  }

  async getProfgroups() {
    return await this.profGroupModel.find({});
  }

  async getPricecodes() {
    return await this.priceCodeModel.find({});
  }
}
