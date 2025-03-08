import { createRide } from "../service/ride.service.js";
import { validationResult  } from "express-validator";
import { getFare } from "../service/ride.service.js";
import { getAdreessCoordinate, getRidebossesIntheRadius } from "../service/maps.service.js";
import RideBossModel from "../models/RideBoss.model.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";
import { confirmRide,startride } from "../service/ride.service.js";
import { endride } from "../service/ride.service.js";
// export const createride=async(req,res)=>{
   
//     const errors=validationResult(req);
//     console.log(errors)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }

//     const {userId,pickup,destination,vechicleType}=req.body;
   
//        try{
//         const ride=await createRide({user:req.user._id,pickup,destination,vechicleType})
//         res.status(201).json(ride)



//         const pickupcorrdinates=await getAdreessCoordinate(pickup)
//         console.log(pickupcorrdinates)
//        let ltd=pickupcorrdinates.ltd;
//         let lng=pickupcorrdinates.lng
//         const ridebossinradius=await getRidebossesIntheRadius(ltd,lng,5)
//          console.log(ridebossinradius)
      

            
//       } catch (error) {
//         console.error(error);
//         if (!res.headersSent) {
//             res.status(500).json({ error: "Something went wrong" });
//         }
//     }

// };




























// export const getfare=async(req,res)=>{
//     console.log("Query Params:", req.query);
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }


//     const {pickup,destination}=req.query;
   

//        try{
//         const fare=await getFare(pickup,destination)
//         return res.status(200).json({fare})
//      } catch(err){
//         return res.status(500).json({message:err.message})
//      }


export const createride = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vechicleType } = req.body;

  

  try{
            const ride=await createRide({user:req.user._id,pickup,destination,vechicleType})
            res.status(201).json(ride)
    
    
    
            const pickupcorrdinates=await getAdreessCoordinate(pickup)
            console.log(pickupcorrdinates)
            const ltd =pickupcorrdinates.ltd ;  // Example: Bangalore
            const lng =pickupcorrdinates.lng;
            const radiusKm = 10;
            const ridebossinradius=await getRidebossesIntheRadius(ltd,lng,10)
            
            ride.otp=""
      
            const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')
            ridebossinradius.map(RideBoss=>{

              sendMessageToSocketId(RideBoss.socketId,{
                event:'new-ride',
                data:rideWithUser
              })
            })

                     
          } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ error: "Something went wrong" });
            }
        }
      }



export const getfare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  if (!pickup || !destination) {
    return res.status(400).json({ message: "Pickup and destination are required" });
  }

  try {
    const fare = await getFare( pickup, destination );
    return res.status(200).json({ fare });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


export const confirmride = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId} = req.body;
  try {
   const ride=await confirmRide({rideId,RideBoss:req.RideBoss})

  sendMessageToSocketId(ride.user.socketId,{
    event:'ride-confirmed',
    data:ride
  })

return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: error.message});
  }
}


export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId ,otp} = req.query;

  try {
    const ride = await startride({rideId,otp,RideBoss:req.RideBoss});
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }


    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}


export const endRide=async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId} = req.body;
  try {
   const ride=await endride({rideId,RideBoss:req.RideBoss})

  sendMessageToSocketId(ride.user.socketId,{
    event:'ride-ended',
    data:ride
  })


  
return res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: error.message});
  }
}

