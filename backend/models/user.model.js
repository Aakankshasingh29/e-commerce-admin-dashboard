import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"]
    },
     email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true

     },
     password:{
        type: String,
        required: [true, 'password is required'],
        minlength:[6, "pass must be atleast 6 characters long"]
     },

     cartItems:[
        {
            quantity:{
                type: Number,
                default: 1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        }
     ],
     role:{
        type: String,
        enum:["customer","admin"],
        default: "customer"
     },
},
{timestamps: true,

}
)

const user = mongoose.model("user", userSchema);

userSchema.pre ("save", async (next) => {{
    if (!this.isModified("password")) return next();

    try {
        const  salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);    
    }
}
    
})


/*123456 
1234567=> invalid credentials*/
userSchema.methods.comparePassword = async (password) => {
    return bcrypt.compare(password, this.password);
    
}



 export default  user;