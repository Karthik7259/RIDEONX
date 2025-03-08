import rideModel from '../models/ride.model.js';
import {getDistanceTime} from '../service/maps.service.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendMessageToSocketId } from '../socket.js';
import exp from 'constants';

export async function getFare(pickup,destination){
    
    if(!pickup || !destination){
        throw new Error('pickup and destination are required')
    }

    const distanceTime=await getDistanceTime(pickup,destination);
  
    const baseFare = {
        auto: 20,
        car: 50,
        bike: 10
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 5
    };

    const perMinuteRate = {
        auto: 1,
        car: 2,
        bike: 0.5
    };
     
  
    const fare = {
        auto: Math.round( baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value/3600)*perMinuteRate.auto)),
        car:  Math.round(baseFare.car + ((distanceTime.distance.value/1000)* perKmRate.car) + ((distanceTime.duration.value/3600)*perMinuteRate.car)),
        bike: Math.round(
            baseFare.bike + 
            ((distanceTime.distance.value / 1000) * perKmRate.bike) + 
            ((distanceTime.duration.value / 60) * perMinuteRate.bike) // Convert seconds to minutes
        )
    };
    
    return fare;
  
}


function getOtp(num){
function generateOTP(num) {
    const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10, num)).toString();
    return otp;
}
return generateOTP(num)
}
export const createRide= async({
    user,pickup,destination,vechicleType, 
})=>{
    if( !pickup || !destination || !vechicleType){
        throw new Error('All fields are required')
    }

    const fare=await getFare(pickup,destination);

  

    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vechicleType]
    })
          
    return ride;
}

export const confirmRide=async({
    rideId,
    RideBoss
})=>{
    if(!rideId){
        throw new Error('Ride id is required')
    }

  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status:'accepted',
    RideBoss:RideBoss._id
  })

    const ride=await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('RideBoss').select('+otp')
    
   if(!ride){
    throw new Error('Ride not found')
   }

 return ride;
}

export const startride=async({rideId, otp, RideBoss})=>{
    if (!rideId || !otp) {
        throw new Error('Ride id, otp');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate('user').populate('RideBoss').select('+otp');

    if (!ride) {
        throw new Error('Ride not found or RideBoss mismatch');
    }

    if(ride.status!=='accepted'){
        throw new Error('Ride not accpeted')
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing'
    })
 
    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
        data:ride
    })


    return ride;
}

export const endride=  async ( {rideId,RideBoss})=>{
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        RideBoss: RideBoss._id
    }).populate('user').populate('RideBoss').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}
