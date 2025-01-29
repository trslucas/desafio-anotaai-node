import mongoose from "mongoose";

export async function connectToDatabase() {
  try {

    const databaseUrl = "mongodb://localhost:27017/api-catalog"
    await mongoose.connect(databaseUrl)

    console.log(`Conectado ao mongoDB na URL ${databaseUrl}`)
  } catch(error: any) {
    throw new Error(error)
  }
}