import express from "express"
import {body} from "express-validator"
import  { registerRideBoss,loginRideBoss } from "../controllers/RideBoss.controller.js";
import { authRideBoss } from "../middleware/auth.middleware.js";
import { getRideBossProfile,logoutRideBoss } from "../controllers/RideBoss.controller.js";
const router=express.Router();


router.post('/register',[  
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vechicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vechicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),   
    body('vechicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1'),
    body('vechicle.vechicleType').isIn(['Car','Bike','Auto']).withMessage('Please enter a valid vechicle type')
], registerRideBoss);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],loginRideBoss)

router.get('/profile',authRideBoss,getRideBossProfile);

router.get('/logout',authRideBoss,logoutRideBoss);
export default router;
