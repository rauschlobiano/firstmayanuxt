import env from "../environments";
import Profile from "../models/profile.model";
import Item from "../models/item.model";
import itemSize from "../models/itemsize.model";
import AccountStat from "../models/accountstat.model";
import Gender from "../models/gender.model";
import Proftype from "../models/proftype.model";
import Profgroup from "../models/profgroup.model";
import Pricecode from "../models/pricecode.model";

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
    itemSize,
    AccountStat,
    Gender,
    Proftype,
    Profgroup,
    Pricecode,
  ],
};
