import React from 'react'

const WaitingForDriver = (props) => {
  
  return (
    <div>
    <h5 onClick={()=>{
             props.setWaitingForDriver(false)
           }}
           className='p-1 text-center w-[93%] absolute top-0' >
              <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
              </h5>
          <div className='flex items-center justify-between'>
          <img className="h-25" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" />
           <div className='text-right '>
            <h2 className='text-lg font-medium capitalize'>{props.ride?.RideBoss.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.RideBoss.vechicle.plate}</h4>
            <p className='text-sm text-gray-600'>RIDEX DRIVER</p>
            <h1 className='text-sm font-semibold'>OTP:{props.ride?.otp}</h1>
           </div>
          </div>
         <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-2.5 '>
               <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 '>
                   <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                       <h3 className='text-lg font-medium'>Pickup</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>{props.ride?.pickup} </p>
                   </div>
               </div>
               <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
               <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                       <h3 className='text-lg font-medium '>Destination</h3>
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
         </div>       
</div>
  )
}

export default WaitingForDriver