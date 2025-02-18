import couponModel from "../models/coupon.model.js"


export const getCoupon = async (req,res) => {
    try{
        const coupon = await couponModel.findOne({userId: req.user._id, isActive});
        res.json(coupon || null);

    } catch(error){
        // console.log("error in getCoupon controller", error.message);
        // res.status(500).json({message: " server error", error: error.message});
    }
    
};
//  export const  validateCoupon = async (req,res) => {
//     try {
//         const {code}  = req.body;
//         const coupon  = await coupon.findOne({code, userId: req.user._id, isActive});
//         if (!coupon){
//             return res.status(404).json({message: "coupon not found"});

//         }  
//         if (coupon.expirationDate < new Date()) {
//             coupon.isActive = false;
//             await coupon.save();
//             return res.status(404).json({message: "coupon is expired"});
//         }
//         res.json({
//             message: "coupon is valid",
//             code: coupon.code,
//             discountPercentage: coupon.discountPercentage,
//         });
//     } catch (error) {
//         console.log("error in validateCoupon controller", error.message);
//         res.status(500).json({message: "server error", error: error.message})
        
//     }
    
//  };
