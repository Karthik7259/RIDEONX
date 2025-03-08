import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
         <h5 onClick={()=>{
                  props.setconfirmRidepanel(false)
                }}
                className='p-1 text-center w-[93%] absolute top-0' >
                   <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
                   </h5>
             <h3 className='text-2xl font-semibold mb-2'>Confirm Your Ride</h3>
              <div className='flex gap-2 justify-between flex-col items-center'>
              <img className="h-30" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" />
               <div className='w-full mt-2.5 '>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200 '>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup Location</h3>
                            <p className='text-sm -mt-1 text-gray-600 '> {props.pickup} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination Location</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{props.destination}</p>
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
               <div className='mt-5'>  
               {/* <button onClick={()=>{
                   props.setVehicleFound(true)
                   props.setconfirmRidepanel(false)
                   props.createRide()
               }}
                className='w-full  bg-green-600 text-white font-semibold mb-15 rounded-lg'>Confirm</button> */}
                <button
  onClick={() => {
    props.setVehicleFound(true);
    props.setconfirmRidepanel(false);
    props.createRide();
  }}
  className="flex items-center justify-center outline-none cursor-pointer w-[150px] h-[50px] rounded-[30px] border border-[#8F9092] transition-all duration-200 ease-in-out font-sans text-sm font-semibold text-[#606060] shadow-sm bg-gradient-to-b from-[#D8D9DB] via-white to-[#FDFDFD] hover:shadow-[0_4px_3px_1px_#FCFCFC,0_6px_8px_#D6D7D9,0_-4px_4px_#CECFD1,0_-6px_4px_#FEFEFE] hover:inset-[0_0_3px_3px_#CECFD1] active:shadow-[0_4px_3px_1px_#FCFCFC,0_6px_8px_#D6D7D9,0_-4px_4px_#CECFD1,0_-6px_4px_#FEFEFE] active:inset-[0_0_5px_3px_#999,0_0_30px_#aaa] focus:shadow-[0_4px_3px_1px_#FCFCFC,0_6px_8px_#D6D7D9,0_-4px_4px_#CECFD1,0_-6px_4px_#FEFEFE] focus:inset-[0_0_5px_3px_#999,0_0_30px_#aaa]"
>
  Confirm Ride
</button>
               </div>
              </div>       
    </div>
  )
}







export default ConfirmRide