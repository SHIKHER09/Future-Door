// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// module.exports = mongoose.model("User",userSchema)

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword :{
        type : String,
        required : true
    }
})

//generating token

// employeSchema.methods.generateAuthToken = async function(){
//  try {
//     const token = jwt.sign({_id:this._id.toString()},"mynameisyogitaa student" );
//     console.log(token);
// } catch (error) {
//     res.send("the error part"+error);
//  }
// }

//hashing password

// employeSchema.pre("save", async function(next) {
//    if(this.isModified("password")){
//     const passwordHash = await bcrypt.hash(password,10);
   
//     this.confirmpassword = undefined;

// }
//    next();
// })


//now we need to create collection

const register = new mongoose.model("Register" , employeSchema );

module.exports = register;