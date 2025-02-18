import jwt  from "jsonwebtoken";

 export const  protectRoute = async(req,res, next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) {
            return res.status(401).json({message: "unauthorized - no access token provided"});
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await user.findById(decoded.userId).select("-password");
         
        if (!user){
            return res.status(401).json ({message: "user not found"});
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("error in protectRoute middleware", error.message);
        return res.status(401).json({message: "unauthorized - invalid access token"});
    }

 }

export const adminRoute = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        
        next()
    } else {
        return res.status(403).json({message: "access denied- admin only"});
    }
}

export default { protectRoute, adminRoute}