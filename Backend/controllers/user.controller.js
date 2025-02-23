import UserModel from "../models/user.model.js";
import { createUser } from "../service/user.service.js";
import { cookie, validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";
 const registerUser = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        errors: errors.array()
        });
    }
    const { fullname ,email, password } = req.body;

    const userAlreadyExists = await UserModel.findOne({ email });

    if(userAlreadyExists){
        return res.status(400).json({message:'User already exists'});
    }
   
    const hashedPassword = await UserModel.hashPassword(password);
    const user = await createUser({
       firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

     const token = user.generateAuthToken();
    res.status(201).json({ token,user });

}

const loginUser= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        errors: errors.array()
        });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();

    res.cookie('token',token)
    res.status(200).json({ token,user });
}

const getuserProfile = async (req, res) => {
    res.status(200).json({ user: req.user });
}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; 
    await BlacklistToken.create({ token });

    res.status(200).json({ message: "Logged out" });

}


export { registerUser, loginUser,getuserProfile,logoutUser};