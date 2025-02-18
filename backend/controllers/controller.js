// import { TokenExpiredError } from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateToken } from "../utils/jwtHelper.js";

export const signup = async(req,res)=>{
    const { email, password, name} = req.body;
    try {
        const userExists = await User.findOne({email});
    if(userExists){
    return res.status(400).json({message: "user already exists"});
    }
    const user  = await User.create({email,password,name});
    const generateToken1 =(userId)=> {
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });
        return { accessToken, refreshToken };
    }
}catch(err){
console.log(err)
}

    //authenticate
    
  
}
   

const setCookies = (res, accessToken) =>{
    res.cookies("accessToken", accessToken,{
        httpOnly: true,
        secure:process.env.NODE_ENV ==="production",
        sameSite:"strict",
        maxAge: 15 * 60 *  1000,

    })
}
export const login = async(req,res)=>{
    try {
        console.log("here runs the login");
        const {email, password} = req.body;
        const user = await User.findOne ({email, password});
        console.log("here runs the login 2",user);
        if (user){
            const accessToken = generateToken(user);
            const userData = user.toObject();
            delete userData.password;  
            res.status(200).json({message: "You have logged in successfully", user: { ...userData, token: accessToken}})
        }
        else {  
            res.status(401).json({message: "invalid email or password"});
        }

        
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({message: error.message});

    }
    

};
// export const logout = async(req)=>{
//     try {
        
//     } catch (error) {
        
//     }
//     res.send("sign up route called");
// }
