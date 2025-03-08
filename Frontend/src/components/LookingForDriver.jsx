import React from 'react'

const LookingForDriver = (props ) => {
  return (
    <div>
    <h5 onClick={()=>{
             props.setVehicleFound(false)
           }}
           className='p-1 text-center w-[93%] absolute top-0' >
              <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
              </h5>
        <h3 className='text-2xl font-semibold mb-2 '>Looking for Driver</h3>

        
         <div className='flex gap-2 justify-between flex-col items-center'>
         <img className="h-30" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" />
          <div className='w-full mt-2.5 '>
               <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 '>
                   <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                       <h3 className='text-lg font-medium'>Pickup</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>{props.pickup}</p>
                   </div>
               </div>
               <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
               <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                       <h3 className='text-lg font-medium'>Destination</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>{props.destination} </p>
                   </div>
               </div>
               <div className='flex items-center gap-5 p-3   border-gray-200'>
               <i className="ri-money-rupee-circle-line"></i>
                   <div>
                       <h3 className='text-lg font-medium'>{props.fare.fare?.[props.vechicleType]|| 'NA'}</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>Cash</p>
                   </div>
               </div>
          </div>
         </div>       
</div>
  )
}

export default LookingForDriver