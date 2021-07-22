import { Service } from "@mayajs/core";
import { MongoDbServices } from "@mayajs/mongo";
import moment from "moment";

@Service()
export class ItemselltransServices {
  get db() {
    return this.mongo.database("con1");
  }
  get model() {
    return this.db.instance.model("ItemSellTrans");
  }
  get modelitem() {
    return this.db.instance.model("ItemSellTransItem");
  }
  constructor(private mongo: MongoDbServices) {}

  async getalltransactions() {
    return await this.model.find({});
  }

  async getitemsbylocation(params: {}) {
    console.log(params);
    // return await this.modelitem.find(params).populate([{ path: "transitems" }]);
    return await this.modelitem.aggregate([
      { $match: params },
      {
        $group: {
          _id: "$item_id",
          itemdescrip: { $first: "$itemdescrip" },
          itemcode: { $first: "$itemcode" },
          totalpieces: { $sum: "$totalinventory" },
        },
      },
      { $sort: { itemdescrip: 1 } },
    ]);
  }

  async getalltransactionslist() {
    return await this.model
      .find({ transtype: "Selling" }, { transno: 1, client: 1 })
      .populate([{ path: "client" }]);
  }
  async getallreceivingtransactionslist() {
    return await this.model
      .find({ transtype: "Receiving" }, { transno: 1, client: 1 })
      .populate([{ path: "client" }]);
  }
  async getallitemtransferlist() {
    return await this.model.find(
      { transtype: "Item Transfer" },
      { transdate: 1 }
    );
  }

  async getallreporttrans(body: { filters: { dateFrom: ""; dateTo: "" } }) {
    //report for all selling transaction based on date
    let datefrom = new Date(body.filters.dateFrom);
    let dateto = new Date(body.filters.dateTo);

    return await this.model
      .find({
        transdate: { $gte: datefrom, $lte: dateto },
        transtype: "Selling",
      })
      .populate([{ path: "transitems" }, { path: "client" }]);
  }
  async getallreporttransreceived(body: {
    filters: { dateFrom: ""; dateTo: "" };
  }) {
    //report for all selling transaction based on date
    let datefrom = new Date(body.filters.dateFrom);
    let dateto = new Date(body.filters.dateTo);

    return await this.model
      .find({
        transdate: { $gte: datefrom, $lte: dateto },
        transtype: "Receiving",
      })
      .populate([{ path: "transitems" }, { path: "client" }]);
  }
  async getallreportitemsales(body: { filters: { dateFrom: ""; dateTo: "" } }) {
    //reformat date
    let datefrom = new Date(body.filters.dateFrom);
    let dateto = new Date(body.filters.dateTo);

    return await this.model
      .find(
        { transdate: { $gt: datefrom, $lt: dateto }, transtype: "Selling" },
        { transdate: 1, transitems: 1, pricecode: 1, transtotal: 1 }
      )
      .populate([{ path: "transitems" }]);
  }
  async getallreportitemreceived(body: {
    filters: { dateFrom: ""; dateTo: "" };
  }) {
    //reformat date
    let datefrom = new Date(body.filters.dateFrom);
    let dateto = new Date(body.filters.dateTo);

    return await this.model
      .find(
        { transdate: { $gt: datefrom, $lt: dateto }, transtype: "Receiving" },
        { transdate: 1, transitems: 1, pricecode: 1, transtotal: 1 }
      )
      .populate([{ path: "transitems" }]);
  }

  async getspeciftransaction(_id: string) {
    return await this.model
      .findById(_id)
      .populate([{ path: "transitems" }, { path: "client" }]);
  }

  async savetransaction(body: {
    transitems: { [x: string]: string }[];
    transdate: any;
  }) {
    try {
      //create the transitems first
      const { transitems, ...data } = body;
      const promises = Promise.all(
        transitems.map(async (item) => {
          delete item._id;
          item.transdate = body.transdate;
          const modelitem = await this.modelitem.create(item);
          return modelitem._id;
        })
      );

      const res = await this.model.create({
        ...data,
        transitems: await promises,
      });
      res.save();

      return { created: true, resdata: res };
    } catch (ex) {
      console.log(ex);
      return { created: true, resdata: ex };
    }
  }
}

// transitems: [
//     {
//       _id: '60c0e2f6879b195d4080ad03',
//       itemcounter: 1,
//       itemcode: 'KINO105',
//       itemdescrip: 'B&B Kids Powder 150gx36 Barbie',
//       totalpieces: 14,
//       quantity: '3',
//       itemsize: 'Dozen',
//       size: 'Dozen',
//       priceeach: 110.29,
//       priceeachdisplay: 'PHP 110.29',
//       totalcost: 4632.18,
//       totalcostdisplay: 'PHP 4,632.18'
//     },
