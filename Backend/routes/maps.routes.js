import express from 'express'
import { authuser } from '../middleware/auth.middleware.js';
import   {getDistanceTimeres}  from '../controllers/map.controller.js'
import {query} from 'express-validator'
import {getCoordinates} from '../controllers/map.controller.js';
import { getCompleteSuggestions } from '../controllers/map.controller.js';
const router=express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
      authuser,getCoordinates);

router.get('/get-distance',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authuser,getDistanceTimeres
)  

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),authuser,
    getCompleteSuggestions
)



 export default router;