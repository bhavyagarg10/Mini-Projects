const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=new mongoose.Schema({
    username:{type: String, required:true,trim:true},
    email:{type:String,required:true, unique:true, lowercase:true},
    password:{type:String, required:true, minlength:6},
},
{ timestamps:true
}); 

//hash password before saving 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
});

//compare password for login

userSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password);
};

module.exports=mongoose.model('User', userSchema)