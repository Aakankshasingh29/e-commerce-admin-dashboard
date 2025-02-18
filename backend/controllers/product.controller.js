import cloudinary from '../lib/cloudinary.js';
import productModel from '../models/products.model.js';

export const getAllProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({products})
    } catch (error) {
        console.log("error in getAllProducts of controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const  getFeaturedProducts = async(req,res) =>{
    try {
        let FeaturedProducts = await productModel.find({isFeatured: true}).lean();
        if(!FeaturedProducts){
            return  res.status(404).json({message: "no featured products found"});
        }

    } catch (error) {
        console.log("error in getFeaturedProducts", error.message);
        res.status(500).json({message: "server error", error: error.message});
        
    }
}

export const createProduct = async(req,res) =>{
    try {
        const { name, description, price,  image, category} = req.body;
        let cloudinaryResponse = null
        if (image){
          cloudinaryResponse= await cloudinary.uploader.upload(image,{folder: 'products'})
        }
         const product = await productModel.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url? cloudinaryResponse.secure_url: "",
            category
         })
         res.status(201).json(product);
    } catch (error) {
        
        console.log("error in createProduct controller", error.message);
        res.status(500).json({message: "server error", error: error.message});
    }
}
export const deleteProduct = async (req,res)=>{
    try {
        const product = await productModel.findById(re.params.id)
        if (!product){
            return res.status(404).json({ message: "product not found"});
        }
        if (product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try{
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleted image from cloudinary")
        } catch (error){
            console.log("error deleting image from cloudniary", error)
        }
    } 
    await product.findByIdAndDelete(req.paramas.id)
    res.json    
    }catch (error){

    }
}
export const  getProductByCategory = async(req,res) =>{
     const{category} =req.params;
     try{
         const products = await productModel.find({category});
         res.json(products);
     } catch(error){
        console.log ("error in getProducByCategory controller", error.message);
        res.status(500).json({message: "server error", error: error.message});
     }
}
export const getRecommendProducts = async (req,res)=>{
    try {
        const product = await productModel.aggregate([
            {
                $sample1: {size: 3}
            },
            {
                $project:{
                    _id:1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log("error in getRecommendedProducts controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const toggleFeaturedProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductCache();
            res.json(updatedProduct);
        }else{
            res.status(404).json ({message: "product not found"});
        }
    } catch (error) {
        console.log("error  in toggleFeaturedProduct controller", error.message);
        res.status(500).json ({messge: "server error", error: error.message})
    }
    
}

async function updateFeaturedProductCache() {
    try {
        const  FeaturedProducts = await productModel.find({ isFeatured: true}).lean();
    } catch (error) {
        console.log("error in update")
    }
    
}
