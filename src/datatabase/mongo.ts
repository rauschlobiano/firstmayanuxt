import env from "../environments";
import Profile from "../models/profile.model";
import Item from "../models/item.model";
import ItemSize from "../models/itemsize.model";
import AccountStat from "../models/accountstat.model";
import Gender from "../models/gender.model";
import Proftype from "../models/proftype.model";
import Profgroup from "../models/profgroup.model";
import Pricecode from "../models/pricecode.model";
import ItemSizePiece from "../models/itemsizepiece.model";
import ItemPrice from "../models/itemprice.model";
import ItemSellTrans from "../models/itemselltrans.model";
import ItemSellTransItem from "../models/itemselltransitems.model";
import ItemInventory from "../models/iteminventory.model";
import ItemLocation from "../models/itemlocations.model";
import UserInfo from "../models/userinfo.model";

export const mongoOptions = {
  connectionString: env.mongo_conn,
  name: "con1",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  schemas: [
    Profile,
    Item,
    ItemSize,
    AccountStat,
    Gender,
    Proftype,
    Profgroup,
    Pricecode,
    ItemSizePiece,
    ItemPrice,
    ItemSellTransItem,
    ItemSellTrans,
    ItemInventory,
    ItemLocation,
    UserInfo,
  ],
};
