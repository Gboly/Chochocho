import mongoose from "mongoose";

const runDb = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("Successfully connected to mongoDb");
  } catch {
    (e) => console.log("An error occured.", e);
  }
};

export default runDb;
