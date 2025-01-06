import User from "../models/user.model.js";
export const signup = async(req,res)=>{
    const { email, password, name} = req.body;
    try {
        const userExists = await User.findOne({email});
    if(userExists){
    return res.status(400).json({message: "user already exists"});
    }
    const user  = await User.create({email,password,name});
    res.status(201).json({user, message: "user created succesfully"}); 
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};
export const login = async(req,res)=>{
    res.send("sign up route called");
}
export const logout = async(req,res)=>{
    res.send("sign up route called");
}