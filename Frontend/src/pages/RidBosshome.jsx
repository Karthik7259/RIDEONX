import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import RidebossDetails from '../components/RidebossDetails'
import Ridepop from '../components/Ridepop'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import gsap from 'gsap'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketIOContext'
import { RideBossDataContext } from '../context/RideBossContext'
import axios from 'axios'

const RidBosshome = () => {
const [ridePopupPanel, setridePopupPanel] = useState(false)
const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false)
const ridePopupPanelRef=useRef(null)
const confirmridePopupPanelRef=useRef(null)
const [ride, setRide] = useState(null)
const {socket}=useContext(SocketContext)
const {RideBoss}=useContext(RideBossDataContext)

useEffect(()=>{
   
//  if (!RideBoss?._id) return;

   socket.emit('join',{
    userId:RideBoss._id,
    userType: 'rideboss'
   })
// it was working
// const updateLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition( (position) => {
//         console.log({ userId: RideBoss._id,
//         location: {
//             ltd: position.coords.latitude,
//             lng: position.coords.longitude
//         } }  ) 

//         socket.emit('update-location-rideboss', {
//           userId: RideBoss._id,
//           location: {
//             ltd: position.coords.latitude,
//             lng: position.coords.longitude
//         }
//         }
//       )
//     })
//   } 
// }
// down gpt try

const updateLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const locationData = {
              userId: RideBoss._id,
              location: {
                  ltd: position.coords.latitude || null,  // Ensure values are not null
                  lng: position.coords.longitude || null
              }
          };

         

          if (typeof locationData.location.ltd === "number" && typeof locationData.location.lng === "number") {
              socket.emit("update-location-rideboss", locationData);
          } else {
              console.error("❌ Invalid GPS data, not sending:", locationData);
          }
      }, (error) => {
          console.error("❌ Geolocation error:", error.message);
      });
  } else {
      console.error("❌ Geolocation is not supported by this browser.");
  }
};




const locationInterval = setInterval(updateLocation, 60000);

updateLocation()




}); 

socket.on('new-ride',(data)=>{
  console.log(data)
  setRide(data)
  setridePopupPanel(true)
})

async function confirmRide() {
  
const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
  rideId:ride._id,
  ridebossId:RideBoss._id,

},{
  headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
setridePopupPanel(false)
setconfirmridePopupPanel(true)

}

useGSAP(function(){
  if(ridePopupPanel){
   gsap.to(ridePopupPanelRef.current,{
     transform: 'translateY(0)'
   })
  }else{
   gsap.to(ridePopupPanelRef.current,{
     transform: 'translateY(100%)'
   })
  }
 },[ridePopupPanel])

useGSAP(function(){
  if(confirmridePopupPanel){
   gsap.to(confirmridePopupPanelRef.current,{
     transform: 'translateY(0)'
   })
  }else{
   gsap.to(confirmridePopupPanelRef.current,{
     transform: 'translateY(100%)'
   })
  }
 },[confirmridePopupPanel])




  return (
    <div className='h-screen '>
                <div className=' fixed p-6 top-0 flex items-center justify-between w-screen '>
                    <img  className="w-25 " src="./logo2.png" alt="" />
                    <Link to='/home'
                   className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-circle-r-line'></i>
                  </Link>
                  </div>
              {/* <div className="h-[60%]">
              <img className='h-full w-full object-cover' src="https://images.yourstory.com/cs/2/a9efa9c02dd911e9adc52d913c55075e/Imageq406-1583218085413.jpg?fm=png&auto=format&w=800" alt="" />
              
                          </div> */}
                          <div className="h-[60%] ">
  <video 
    className="h-full w-full object-cover" 
    autoPlay 
    loop 
    muted 
    playsInline
  >
    <source src="/public/riding .mp4"  type="video/mp4" />
  </video>
</div>

<div 
  className="h-[40%] p-3 flex flex-col justify-center bg-cover bg-center bg-no-repeat" 
 
>
  <RidebossDetails/>
</div>

              <div ref={ridePopupPanelRef} className="fixed z-10 w-full bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
                <Ridepop
                 ride={ride}
                setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel} 
                
                confirmRide={confirmRide}
                
                />
      </div>
              <div ref={confirmridePopupPanelRef} className="fixed z-10 h-screen w-full bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
                <ConfirmRidePopUp 
                ride={ride}
                setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  )
}

export default RidBosshome