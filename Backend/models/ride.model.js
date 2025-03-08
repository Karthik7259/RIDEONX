import mongoose from "mongoose";



const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    RideBoss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RideBoss',
       
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    duration: {
        type:Number,
    }, // in seconds
    distance: {
        type:Number
    }, // in meters

     paymentID:{
        type:String,
     },
     orderId:{
        type:String
     },
     signature:{
              type:String
     },
     otp:{
        type:String,
        select:false,
        required:true,
     }
});

const rideModel= mongoose.model('rideModel', rideSchema);

export default rideModel;