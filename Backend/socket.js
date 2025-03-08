import { Server } from 'socket.io';
import UserModel from './models/user.model.js';
import RideBossModel from './models/RideBoss.model.js';
let io;

// export const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST']
//     }
//   });
//   io.on('connection', (socket) => {
//     console.log(`New client connected: ${socket.id}`);

//     socket.on('join', async (data) => {
//         const { userId, userType } = data;
//         if (userType==='user') {
//           await UserModel.findByIdAndUpdate(userId,{
//             socketId: socket.id}),

//           socket.on('disconnect', () => {
//             console.log(`Client disconnected: ${socket.id}`);
//           })
//         }
//       });
// }

// }


export const initializeSocket = (server) => {
    io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  
    io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);
  
      socket.on('join', async (data) => {
       
          const { userId, userType } = data;

          console.log(`User ${userId} joined as ${userType}`)
  
          if (userType === 'user') {
            await UserModel.findByIdAndUpdate(userId, {socketId: socket.id,});
  
            // console.log(`User ${userId} socket updated: ${socket.id}`);
          }else if(userType==='rideboss'){
            await RideBossModel.findByIdAndUpdate(userId, {socketId: socket.id,});
            // console.log(`Rideboss ${userId} socket updated: ${socket.id}`);
          }
        
      });

// socket.on('update-location-rideboss', async (data) => {
//         const { userId, location } = data;
//       if (!location || !location.ltd  ||  !location.lng) {
//        return socket.emit('error',{
//         message:'Invalid location'
//        })  
    
//       }
       
//           await RideBossModel.findByIdAndUpdate(userId, { location: {
//                         type: "Point",
//                         coordinates: [location.lng, location.ltd]  // Longitude first!
//                     } });


//         //   await RideBossModel.findByIdAndUpdate(
//         //     userId,
//         //     {
//         //         $set: {
//         //             location: {
//         //                 type: "Point",
//         //                 coordinates: [location.lng, location.ltd]  // Longitude first!
//         //             }
//         //         }
//         //     },
//         //   // Return updated document
//         // );
        
//           console.log(`Rideboss ${userId} location updated: ${location}`);
//         // } catch (error) {
//         //   console.error(`Error updating location for rideboss ${userId}:`, error);
//         // }
//       });
  
// socket.on("update-location-rideboss", async (data) => {
//   console.log("📩 Received location update:", data);

//   try {
//       const { userId, location } = data;

//       // Validate location input
//       if (!location || !location.lat || !location.lng) {
//           return socket.emit("error", { message: "Invalid location" });
//       }

//       // Update the location in MongoDB
//       await RideBossModel.findByIdAndUpdate(userId, {
//           location: {
//               type: "Point",
//               coordinates: [location.lng, location.ltd], // Longitude first!
//           },
//       });

//       console.log("✅ Location updated in DB for user:", userId);

//       // Emit the updated location to all clients (optional)
//       socket.broadcast.emit("rideboss-location-updated", { userId, location });

//   } catch (error) {
//       console.error("❌ Error updating location:", error);
//       socket.emit("error", { message: "Failed to update location" });
//   }
// });

socket.on("update-location-rideboss", async (data) => {
 

  const { userId, location } = data;

  if (!location || typeof location.ltd !== "number" || typeof location.lng !== "number") {
      console.error("❌ Invalid location data received:", data);
      return socket.emit("error", { message: "Invalid location data" });
  }

  try {
      console.log("🔄 Updating DB for user:", userId);

      const result = await RideBossModel.findByIdAndUpdate(userId, {
          $set: {
              location: {
                  type: "Point",
                  coordinates: [location.lng, location.ltd] // Ensure both values are numbers
              }
          }
      }, { new: true }); // Returns updated document

      if (result) {
          // console.log("✅ Location updated in DB for user:", userId);
          // socket.broadcast.emit("location-updated", { userId, location });
      } else {
          console.log("⚠️ No user found with ID:", userId);
      }
  } catch (error) {
      console.error("❌ Error updating location:", error);
      socket.emit("error", { message: "Location update failed" });
  }
});



      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  };


export const sendMessageToSocketId = (socketId, messageObject) => {

 console.log(`sending message to ${socketId}`,messageObject)

  if (io) {
    io.to(socketId).emit(messageObject.event,messageObject.data);
  } else {
    console.error('Socket.io is not initialized');
  }
};