
import {  getAdreessCoordinate, getDistanceTime,getAutoCompleteSuggestions} from '../service/maps.service.js';

import { validationResult } from 'express-validator';
const getCoordinates = async (req, res, next) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { address } = req.query;
    try {
        const coordinates = await getAdreessCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        return res.status(404).json({ message: 'Address not found' });
    }
}

const getDistanceTimeres=async(req,res,next)=>{
   try{
     
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ message: 'Origin and destination are required' });
    }
    const distanceTime= await  getDistanceTime(origin,destination)

       res.status(200).json(distanceTime)
    // Further processing with origin and destination
   }catch(err){
    console.error(err);
    res.status(500).json({message:'Internal server error'})
   }
}

const getCompleteSuggestions=async(req,res,next)=>{
     try{  

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
         const suggestions =await getAutoCompleteSuggestions(input);
         
         res.status(200).json(suggestions)
     }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'})
     }
}


export {getCoordinates,getDistanceTimeres,getCompleteSuggestions};