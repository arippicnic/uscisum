import mongoose from "mongoose";

const { DB_PATH } = process.env;

export default async () => {
  try {
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("INFO - Database connected.");
  } catch (err) {
    console.error("ERROR - Unable to connect to the database:", err);
  }
};
