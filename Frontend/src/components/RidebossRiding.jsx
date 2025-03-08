import React, { useRef ,useState} from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from './FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import  NavigationMode from './navigationmode'

const RidebossRiding = () => {
 
   const [finshRidePanel, setfinshRidePanel] = useState(false)
    const finshRidePanelRef=useRef(null)
    const location=useLocation()
    const ride=location.state?.ride
 console.log(ride)


  useGSAP(function(){
    if(finshRidePanel){
     gsap.to(finshRidePanelRef.current,{
       transform: 'translateY(0)'
     })
    }else{
     gsap.to(finshRidePanelRef.current,{
       transform: 'translateY(100%)'
     })
    }
   },[finshRidePanel])



  return (
    <div className='h-screen relative flex flex-col justify-end'>
        
                <div className=' fixed p-6 top-0 flex items-center justify-between w-screen '>
                    <img  className="w-25 " src="./logo2.png" alt="" />
                    <Link to='/Rideboss-home'
                   className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-circle-r-line'></i>
                  </Link>
                  </div>
             
              <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
               onClick={()=>{
                setfinshRidePanel(true)
               }}
              >
              <h5 onClick={()=>{
                
            }}
            className='p-1 text-center w-[90%]  absolute top-0' >
               <i className="text-3xl text-gray-300 ri-arrow-up-s-line"></i>
               </h5>
                    <h4 className='text-lg font-semibold'>4KM away</h4>
                    <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
              </div> 
              <div ref={finshRidePanelRef} className="fixed z-[500] w-full bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
                <FinishRide 
                ride={ride}
                setfinshRidePanel={setfinshRidePanel} />
      </div>
      <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <NavigationMode pickup={ride.pickup} destination={ride.destination}/>
              </div>
    </div>
  )
}
export default RidebossRiding