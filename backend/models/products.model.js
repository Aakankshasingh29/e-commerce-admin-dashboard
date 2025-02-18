import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({ 
    name:{
        type: String,
        required: true
    },
    descrption:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    isFeatured:{
        type: Boolean,
        default: false
    }

}, {timeStamps: true});

const product = mongoose.model("product", productsSchema);
export default product
