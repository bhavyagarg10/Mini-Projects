const jwt=require('jsonwebtoken');
const User=require('../models/User');

const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;

    //check authorization header exists and start with 'Bearer'
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unothorized: No token provided"});
    }

    const token= authHeader.split(' ')[1]; //Get the token from 'Bearer <token>'

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET); //validate token
        req.user =await User.findById(decoded.id).select('-password'); // attach user to req
        next(); //Continue to route handler
    }
    catch(err){
        res.status(401).json({message:"unauthorized: Invalid or expired token"})
    }
};

module.exports = authMiddleware;