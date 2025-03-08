import React from 'react'

const Vechiclepanel = (props) => {
  console.log(props)
  return (
    <div>
         <h5  
                onClick={()=>{
                  props.setvehiclePanelOpen(false)
                }}
                className='p-1 text-center w-[93%] absolute top-0' >
                   <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
                   </h5>
             <h3 className='text-2xl font-semibold mb-5 '>Choose a Vehicle</h3>
          <div onClick={()=>{
            props.setconfirmRidepanel(true)
            props.selectVehicle('car')
          }} className='flex border-2 mb-2  active:border-black rounded-xl p-3 w-full items-center justify-between'>
            <img className="h-20" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" />
           <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Ride Go <span><i className="ri-user-3-line"></i>4</span></h4>
             <h5 className='font-medium text-sm'>2 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordabel, compact rides</p>
           </div>
              <h2 className='text-xl font-semibold'>₹{props.fare.fare?.car || "N/A"}</h2>
          </div>
          <div 
          onClick={()=>{
            props.setconfirmRidepanel(true)
            props.selectVehicle('bike')
          }}
                    
           className='flex border-2 mb-2 active:border-black rounded-xl p-3 w-full items-center justify-between'>
            <img className="h-16" src="https://images.tractorjunction.com/roadster_pro_2_5b8c52a770.png?format=webp" alt="" />
           <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Bike <span><i className="ri-user-3-line"></i>1</span></h4>
             <h5 className='font-medium text-sm'>3 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordabel, Bike rides</p>
           </div>
              <h2 className='text-xl font-semibold'>₹{props.fare.fare?.bike || "N/A"}</h2>
          </div>
          <div
          onClick={()=>{
            props.setconfirmRidepanel(true)
            props.selectVehicle('auto')
          }}
          
          className='flex border-2 mb-2 active:border-black  rounded-xl p-3 w-full items-center justify-between'>
            <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
           <div className=' w-1/2'>
            <h4 className='font-medium text-base'>RideX Auto<span><i className="ri-user-3-line"></i>3</span></h4>
             <h5 className='font-medium text-sm'>3 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordabel, Auto rides</p>
           </div>
              <h2 className='text-xl font-semibold'>₹{props.fare.fare?.auto || "N/A"}</h2>
          </div>
    </div>
  )
}

export default Vechiclepanel