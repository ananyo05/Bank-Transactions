const { Schema, default: mongoose } = require("mongoose");
const bcrypt=require('bcryptjs')

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required to create an account"]
    },
    email:{
        type:String,
        required:[true,"Email is required for creating an account"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minlength:[6,"Password should be more than 6 characters"],
        select:false
    }
})

userSchema.pre('save',async function () {
    if(!this.isModified(password))return

    const hash=await bcrypt(this.password,10);
    this.password=hash;
    return;
})

userSchema.methods.comparePassword=async function (password) {
    
    return await bcrypt.compare(password,this.password);
}

const userModel=mongoose.model("user",userSchema);

module.exports=userModel