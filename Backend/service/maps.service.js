import axios from 'axios'
import RideBossModel from '../models/RideBoss.model.js';
import mongoose from 'mongoose';
export const getAdreessCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log("Google API Response:", JSON.stringify(data, null, 2));

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                ltd: location.lng,
                lng: location.lat    
            };
        } else {
            throw new Error('Unable to find the address');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch coordinates');
    }
};

const formatLocation = (location) => {
    return location.replace(/\s+/g, "+"); // Replace spaces with "+"
};
export const getDistanceTime=async(origin,destination)=>{
    if(!origin || !destination ){
     throw new Error('Origin and destination are required');
    }
    const formattedOrigin = formatLocation(origin);
    const formattedDestination = formatLocation(destination);

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${formattedOrigin}&destinations=${formattedDestination}&key=${apiKey}`;
    
    console.log("API URL:", url);


  try{
    const response = await axios.get(url);
    const data = response.data;
    console.log("Google API Response:", data);

    if (data.status === 'OK') {
         
            if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route could be found between the origin and destination');
            }
            return response.data.rows[0].elements[0]
    } else {
        throw new Error('Unable to calculate distance and time');
    }

  }catch(err){
    console.error(err);
    throw err
  }
}

// export const getAutoCompleteSuggestions=async(input)=>{
//     if(!input){
//         throw new Error('Qurery is required')
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
//    try{
//     const response=await axios.get(url)
//     if(!response.data.status ==='OK'){
//         return response.data.predictions
//     }else{
//         throw new Error('Unable to fetch suggestions')
//     }
// }catch(err){
//     console.error(err);
//     throw err
// }
// }



export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }
         
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        throw new Error("Missing GOOGLE_MAPS_API key in environment variables");
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            // return response.status(200).json(data)
            return data.predictions.map(prediction => prediction.description); // Extract place names
        } else {
            throw new Error(`Google API Error: ${data.status} - ${data.error_message || 'No details provided'}`);
        }
    } catch (err) {
        console.error("Google Places API Error:", err.response?.data || err.message);
        throw new Error("Unable to fetch suggestions");
    }
};


// export const  getRidebossesIntheRadius = async(ltd,lng,radius)=>{

// // radius in km 
// console.log("Latitude:", ltd, "Longitude:", lng, "Radius:", radius);
// console.log("Type of Latitude:", typeof ltd, "Type of Longitude:", typeof lng);

// console.log("Longitude:", lng, "Latitude:", ltd, "Radius:", radius);
// console.log("Querying with:", [[lng, ltd], radius / 6371]);




// // console.log('this is finding message',await RideBossModel.find({ location: { $geoWithin: { $centerSphere: [[lng,ltd], radius / 6371] } } }));

// //      const ridebosses=await RideBossModel.find({
// //         location:{
// //           $geoWithin:{
// //             $centerSphere:[ [lng,ltd], radius/6371]
// //           }  
// //         }
// //      })
// const radiusInRadians = radius / 6371;
// console.log(`Searching within ${radiusInRadians} radians of (${lng}, ${ltd})`);

// const ridebosses = await RideBossModel.find({
//     location: {
//         $geoWithin: {
//             $centerSphere: [[lng, ltd], radiusInRadians]
//         }
//     }
// });

// console.log("Found results:", ridebosses);

// return ridebosses;
// }












// export const getRidebossesIntheRadius = async (ltd, lng, radius) => {
//     const radiusInRadians = radius / 6371;
//     console.log(`Searching within ${radiusInRadians} radians of (${lng}, ${ltd})`);

//     // Check types before querying
//     if (typeof lng !== "number" || typeof ltd !== "number") {
//         console.error("Invalid lng/ltd values:", { lng, ltd });
//         return [];
//     }

//     // Perform query
//     const ridebosses = await RideBossModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[lng, ltd], radiusInRadians]
//             }
//         }
//     });

  
      

//     console.log("Found results:", ridebosses);
//     return ridebosses;
// };

// export const getRidebossesIntheRadius = async (ltd, lng, radius) => {
//     const radiusInRadians = radius / 6371;
//     console.log(`🧐 Searching within ${radiusInRadians} radians of (${lng}, ${ltd})`);

//     if (typeof lng !== "number" || typeof ltd !== "number") {
//         console.error("❌ Invalid longitude/latitude:", { lng, ltd });
//         return [];
//     }

//     try {
//         const ridebosses = await RideBossModel.find({
//             location: {
//                 $geoWithin: {
//                     $centerSphere: [[ltd, lng], radiusInRadians]
//                 }
//             }
//         });

//         console.log("✅ Found RideBosses:", ridebosses);
//         return ridebosses;
//     } catch (error) {
//         console.error("❌ Geo query error:", error);
//         return [];
//     }
// };
// export const getRidebossesIntheRadius = async (ltd, lng, radiusKm) => {
//     const maxDistanceMeters = radiusKm * 1000; // Convert km to meters

//     console.log(`🧐 Searching within ${radiusKm} km of (${ltd}, ${lng})`);

//   const rideBosses = await RideBossModel.aggregate([
//     {
//         $geoNear: {
//           near: { type: "Point", coordinates: [lng, ltd] },
//           distanceField: "distance",
//           spherical: true,
//           maxDistance: radiusKm * 1000 // 100 km
//         }
//       }
//     ]);
//     console.log(rideBosses);
//     return rideBosses;
// };

// export const getRidebossesIntheRadius = async (ltd, lng, radiusKm) => {
//     const maxDistanceMeters = radiusKm * 1000; // Convert km to meters

//     console.log(`🧐 Searching within ${radiusKm} km of (${ltd}, ${lng})`);

//     const rideBosses = await RideBossModel.find({
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [lng, ltd] // Longitude first, then latitude!
//                 },
//                 $maxDistance: maxDistanceMeters
//             }
//         }
//     });

//     console.log(rideBosses);
//     return rideBosses;
// };
export const getRidebossesIntheRadius = async (ltd, lng, radiusKm) => {
    const maxDistanceMeters = radiusKm * 1000; // Convert km to meters

    console.log(`🧐 Searching within ${radiusKm} km of (${ltd}, ${lng})`);

    try {
    
        const maxDistanceMeters = 520000; 

        await RideBossModel.createIndexes({ location: "2dsphere" });
        const indexes = await RideBossModel.listIndexes();
console.log(indexes);
console.log(typeof ltd, typeof lng);
const count = await RideBossModel.countDocuments();
console.log("Total documents:", count);
const test = await RideBossModel.findOne();
console.log(test);

const ltdNum = parseFloat(ltd);
const lngNum = parseFloat(lng);

console.log("Converted Ltd:", ltdNum, "Lng:", lngNum);

        
        const rideBosses = await RideBossModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [ltdNum,lngNum]
                    },
                    $maxDistance: maxDistanceMeters
                }
            }
        });
        
        console.log("✅ Found RideBosses:", rideBosses);




        return rideBosses;
    } catch (error) {
        console.error("❌ Error fetching RideBosses:", error);
        return [];
    }
};
