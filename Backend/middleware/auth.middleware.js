import UserModel from "../models/user.model.js";
import RideBossModel from "../models/RideBoss.model.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import bcrpyt from"bcrypt"
import jwt from "jsonwebtoken"

const authuser = async (req,res,next) => {
    const token=req.cookies.token || ( req.headers.authorization?.split(' ')[1]);
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    const isBlacklisted=await BlacklistToken.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await UserModel.findById(decoded.id);        

        req.user=user;

       return next();
    }catch(err){
        return res.status(401).json({message:'unauthorized'})
    }
}
const authRideBoss=async (req,res,next)=>{
    const token=req.cookies.token || ( req.headers.authorization?.split(' ')[1]);
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    const isBlacklisted=await BlacklistToken.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const RideBoss=await RideBossModel.findById(decoded.id);        

        req.RideBoss=RideBoss;

       return next();
    }catch(err){
        return res.status(401).json({message:'unauthorized'})
    }
}

export {authuser,authRideBoss};