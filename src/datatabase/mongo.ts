import env from "../environments";
import Postrans from "../models/postrans.model";
import Item from "../models/item.model";

export const mongoOptions = {
  connectionString: env.mongo_conn,
  name: "con1",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  schemas: [Postrans, Item],
};
