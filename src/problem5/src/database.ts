import { connect } from "mongoose";

const dbConnection = {
  url: `mongodb://localhost:27017/problem5`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export const connectDB = async () => {
  try {
    await connect(dbConnection.url, { dbName: "problem5" });
    console.log("CONNECTED TO DB!!!!");
  } catch (error) {
    console.log("FAIL TO CONNECT TO DB", error);
  }
};
