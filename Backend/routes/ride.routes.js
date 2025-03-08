import express from 'express'
import { body,query } from 'express-validator'
import { createride, getfare } from '../controllers/Ride.controller.js'
import { authRideBoss, authuser } from '../middleware/auth.middleware.js'
import { confirmride } from '../controllers/Ride.controller.js'
import { startRide,endRide } from '../controllers/Ride.controller.js'
const router=express.Router()



router.post('/create',
    authuser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vechicleType').isString().isIn(['auto','car','bike']).withMessage('Invalid vechicle type'),
    createride
    
)

router.get('/get-fare',
    authuser,
       query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
       query('destination').isString().isLength({min:3}).withMessage('Invalid destination') 
    ,getfare
)


router.post('/confirm',
    authRideBoss,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmride
)

router.get('/start-ride',
    authRideBoss,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRide
)

router.post('/end-ride',
    authRideBoss,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)


export default router