import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setotp] = useState("")
  const navigate=useNavigate()
  const submitHandler= async(e)=>{
    e.preventDefault()
   
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
            rideId: props.ride._id,
            otp: otp
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
   if(response.status===200){
    props.setconfirmridePopupPanel(false)
    props.setridePopupPanel(false)
    navigate('/Rideboss-Riding',{state:{ride:props.ride}})
   }
  }

  return (
    <div>
        
        <h5 onClick={()=>{
              props.setridePopupPanel(false)    
                }}
                className='p-1 text-center w-[93%] absolute top-0' >
                   <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
                   </h5>
             <h3 className='text-2xl font-semibold mb-2'>Confirm this ride to start</h3>
                <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-12 w-11 rounded-full object-cover  ' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                            <h2 className='text-xl font-medium capitalize '>{props.ride?.user.fullname.firstname}</h2>
                    </div>
                      <h5 className='text-lg font-semibold '>2.2 KM</h5>
                </div>
              <div className='flex gap-2 justify-between flex-col items-center'>
              {/* <img className="h-30" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" /> */}
               <div className='w-full mt-2.5 '>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 '>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3   border-gray-200'>
                    <i className="ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash</p>
                        </div>
                    </div>
               </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                          <input value={otp} onChange={(e)=>setotp(e.target.value)} type="text" className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg mt-3 w-full"  placeholder='Enter OTP'/>
                    <button 
                className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
               <button onClick={()=>{
                   props.setconfirmridePopupPanel(false)
                   props.setridePopupPanel(false)
               }}
                className='w-full mt-1 bg-red-500 text-lg  text-white  font-semibold p-3 rounded-lg'>Cancel </button>
                    </form>
                </div>
              </div>   
    </div>
  )
}

export default ConfirmRidePopUp