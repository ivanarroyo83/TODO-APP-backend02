import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try {
        console.log("connecting to mongoDB.... ");
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('Mongodb connected successfully');
        
        
        
    } catch (error) {
        console.log('error connceting to mongoDB', error);
        process.exit(1)
        
        
    }
}

export default connectToMongoDB;