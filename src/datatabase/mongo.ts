import env from "../environments";
import addressModel from "../models/address.model";
import Test from "../test/test.model";

export const mongoOptions = {
  connectionString: env.mongo_conn,
  name: "con1",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  schemas: [Test, addressModel],
};
