import mongoose from "mongoose";
import bcrypt from "bcrypt"
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

// userSchema.pre ("save", async (next) => {{
//     if (!this.isModified("password")) return next();

//     try {
//         const  salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password,salt);
//         next();
//     } catch (error) {
//         next(error);    
//     }
// }
    
// })

// userSchema.methods.comparePassword = async function (password){
//     return bcrypt.compare(password, this.password);
    
// }
const user = mongoose.model("users", userSchema);



/*123456 
1234567=> invalid credentials*/
 export default  user;