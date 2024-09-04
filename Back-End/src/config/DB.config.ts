import mongoose from "mongoose";

export default async function dbConnect(): Promise<void> {
    await mongoose.connect(process.env.MONGOOSE_URL || "");
    return console.log("Connection to DB established");
}