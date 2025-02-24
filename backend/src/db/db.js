import mongoose from "mongoose";

export async function connectDb() {
  try {
    if (!process.env.DATABASE_URI || !process.env.DATABASE_NAME) {
      throw new Error(
        "DATABASE_URI or DATABASE_NAME is not defined in environment variables."
      );
    }

    const connectionString = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
    const connectionInstance = await mongoose.connect(connectionString);

    console.log(
      "mongodb database connected , host name:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("database connection failed in db.js file", error);
  }
}
