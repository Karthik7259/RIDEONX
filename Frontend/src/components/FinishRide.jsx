import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const FinishRide = (props) => {

 const   navigate=useNavigate()
async function endride() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

        rideId: props.ride._id


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        navigate('/RideBoss-home')
    }
}
return (
    <div>
        
        <h5 onClick={()=>{
              props.setfinshRidePanel(false)    
                }}
                className='p-1 text-center w-[93%] absolute top-0' >
                   <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
                   </h5>
             <h3 className='text-2xl font-semibold mb-2 '>Finish  this ride</h3>
                <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-12 w-11 rounded-full object-cover  ' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                            <h2 className='text-xl font-medium '>{props.ride?.user.fullname.firstname}</h2>
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
                            <p className='text-sm -mt-1 text-gray-600 '> {props.ride?.pickup} </p>
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
                    <button
                    onClick={endride}
                className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride </button>
                   <p className=' mt-10 text-xs'>click on Finish ride if you have completed the payment.</p>  
                </div>
              </div>   
    </div>
  )
}

export default FinishRide