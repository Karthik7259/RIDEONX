import express from 'express';
import { body } from 'express-validator';
const router = express.Router();
import {registerUser, loginUser} from '../controllers/user.controller.js';
import {getuserProfile} from '../controllers/user.controller.js';
import { authuser } from '../middleware/auth.middleware.js';
import { logoutUser } from '../controllers/user.controller.js';
router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],loginUser)


router.get('/profile',authuser,getuserProfile)
router.get('/logout',authuser,logoutUser)

export default router;