const mongoose=require("mongoose")

const connectdb= async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
      console.log("mongodb connected")
    }
    catch(err){
        console.error("Mongodb connection failed",err.message)
        process.exit(1) //exit app if db connection fail
    }
}
module.exports=connectdb;