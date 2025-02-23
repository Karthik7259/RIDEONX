import RideBossModel from "../models/RideBoss.model.js";
import createRideBoss from "../service/Rideboss.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";

const registerRideBoss = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { fullname, email, password, vechicle } = req.body;

    const isRideBoss = await RideBossModel.findOne({ email });

    if (isRideBoss) {
        return res.status(400).json({ message: 'RideBoss already exists' });
    }
    const hashedPassword = await RideBossModel.hashPassword(password);
    const RideBoss = await createRideBoss({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vechicle.color,
        plate: vechicle.plate,
        capacity: vechicle.capacity,
        vechicleType: vechicle.vechicleType
    });
    const token = RideBoss.generateAuthToken();
    res.status(201).json({ token, RideBoss });
}

const loginRideBoss = async (req, res,next) => {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;

    const RideBoss = await RideBossModel.findOne({ email }).select('+password');
    if (!RideBoss) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await RideBoss.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = RideBoss.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({ token, RideBoss })
}
const getRideBossProfile = async (req, res) => {
    res.status(200).json({ RideBoss: req.RideBoss });
}

const logoutRideBoss = async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

    await BlacklistToken.create({ token });

    res.clearCookie('token');
     
    res.status(200).json({ message: 'Logged out successfully' });
}   

export {registerRideBoss,loginRideBoss,getRideBossProfile,logoutRideBoss};