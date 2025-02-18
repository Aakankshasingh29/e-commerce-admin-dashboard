import mongoose, { connect } from "mongoose";
 export const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://0.0.0.0:27017/e_commerce');
        console.log(`mongoDB connected:${conn.connection.host}`);
    } catch (error){
        console.log('error connecting to MONGODB', error.message);
        process.exit(1)
    }
    
 }
 export default connectDB