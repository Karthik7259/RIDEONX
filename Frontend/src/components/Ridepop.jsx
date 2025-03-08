import React from 'react'

const Ridepop = (props) => {
  return (
    <div>
        
        <h5 onClick={()=>{
              props.setridePopupPanel(false)    
                }}
                className='p-1 text-center w-[93%] absolute top-0' >
                   <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
                   </h5>
             <h3 className='text-2xl font-semibold mb-2 '>A Ride for Available</h3>
                <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-12 w-10 rounded-full object-cover  ' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                            <h2 className='text-xl font-medium '> {props.ride?.user.fullname.firstname } </h2>
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
                            <p className='text-sm -mt-1 text-gray-600 '> {props.ride?.pickup}</p>
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
               <div className='flex mt-5 w-full items-center justify-between'>
               <button onClick={()=>{
                   props.setridePopupPanel(false)
                  
               }}
                className=' mt-1 bg-gray-300 text-gray-700  font-semibold p-3 px-10 rounded-lg'>Ignore</button>
               <button onClick={()=>{
                   props.setconfirmridePopupPanel(true)
                   props.confirmRide()
               }}
                className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept Ride</button>
               
               </div>
              </div>   
    </div>
  )
}

export default Ridepop