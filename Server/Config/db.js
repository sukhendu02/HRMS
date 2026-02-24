// import mongoose from "mongoose";
// export const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Database connected successfully");
//     }   catch (error) {     
//         console.error(`Database Connection error Error: ${error.message}`);
//         process.exit(1);
//     }
// /

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) {
    // ✅ reuse existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
};
