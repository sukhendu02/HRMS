import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }   catch (error) {     
        console.error(`Database Connection error Error: ${error.message}`);
        process.exit(1);
    }
};
