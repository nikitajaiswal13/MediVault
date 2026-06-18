const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please Enter Your Name"]
    },
    email : {
        type : String , 
        required : [true , "Please Enter Your Email"],
        unique : true, 
        validate : [validator.isEmail , "Please Enter Valid Email"]
    },
    password : {
        type : String ,
        required : [true , "Please Enter Your Password"],
        minLength : [8 , "Password should be atleast 8 characters long"],
        select : false
    },
    passwordConfirm : {
        type : String , 
        required : [true , "Please Enter Your Password"],
        select : false,
        validate : {
            validator : function(el) {
                return el === this.password 
            },
            message : "Password do not  match"
        }
    }
})

// To Encrypt the password
userSchema.pre('save' ,async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 12)
    this.passwordConfirm = undefined
})

// To Compare password while logging in
userSchema.methods.comparePassword =  async function(candidatePassword , userPassword){
    return await bcrypt.compare(candidatePassword , userPassword)
}

const User = mongoose.model('User' , userSchema);
module.exports = User