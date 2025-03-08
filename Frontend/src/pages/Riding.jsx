import React from 'react'
import { Link,useLocation} from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketIOContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Riding = () => {
  const location=useLocation()
 const {ride}=location.state || {}
const {socket}=useContext(SocketContext)
 const Navigate=useNavigate()

 socket.on("ride-ended",()=>{
  Navigate('/home')
 })  

  return (
    <div className='h-screen'>
                  <Link to='/home'
                   className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-home-5-line'></i>
                  </Link>
              <div className='h-1/2 '>
                  <LiveTracking/>   
              </div>
              <div className='h-1/2 p-4 '>

              <div className='flex items-center justify-between'>
          <img className="h-16" src="https://static.vecteezy.com/system/resources/previews/014/264/118/original/isometric-vehicle-3d-render-png.png" alt="" />
           <div className='text-right '>
            <h2 className='text-lg font-medium capitalize'>{ride?.RideBoss.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.RideBoss.vechicle.plate}</h4>
            <p className='text-sm text-gray-600'>RIDEX DRIVER</p>
           </div>
          </div>
         <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-2.5 '>
               
               <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
               <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                       <h3 className='text-lg font-medium '>Destination</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>{ride?.destination} </p>
                   </div>
               </div>
               <div className='flex items-center gap-5 p-3   border-gray-200'>
               <i className="ri-money-rupee-circle-line"></i>
                   <div>
                       <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                       <p className='text-sm -mt-1 text-gray-600 '>Cash</p>
                   </div>
               </div>
          </div>
         </div>   
                <Link to="/payment" className='inline-block w-1/2 mt-5 ml-20 bg-green-600  text-white font-semibold p-3 rounded-lg' >Make a payment</Link>
        
              </div>
    </div>
  )
}

export default Riding