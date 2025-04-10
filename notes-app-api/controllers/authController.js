const User=require('../models/User');
const jwt=require('jsonwebtoken');

const createToken =(userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{
        expiresIn:'7d'
    });
};

exports.register =async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        console.log("Registering:", username, email); // log inputs

        const existingUser= await User.findOne({email});
        if(existingUser) return res.status(400).json({message:'email already in use'});

        const user=await User.create({username,email,password});
        const token = createToken(user.id);

        res.status(201).json({token,user:{ id:user._id, username, email}})
    }
    catch(err){
        console.error("Registration error:", err); // log the error
        res.status(500).json({message:"Registration failed", error:err.message});
    }
} 

exports.login= async (req,res)=>{
    try{
        const {email,password}=req.body;

        const user= await User.findOne({ email });
        if(!user) return res.status(400).json({message:"Invalid email or password"});

        const isMatch= await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});

        const token=createToken(user.id);

        console.log("Succesfully login", user.username); // log login 
        res.status(200).json({token, user:{id: user._id,username:user.username,email}})
    }
    catch(err){
        res.status(500).json({message:'Login failed', error:err.message});
    }
};