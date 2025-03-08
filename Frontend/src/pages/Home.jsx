import React, { useState, useRef, useContext, useEffect } from 'react'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import Vechiclepanel from '../components/Vechiclepanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketIOContext'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelopen, setPanelopen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState("") // "pickup" or "destination"
  const [fare, setfare] = useState({})
  const vehiclepanelRef = useRef(null)
  const confirmRidepanelRef = useRef(null)
  const vechiclefoundRef = useRef(null)
  const WaitingForDriverref = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vechicleType, setvechicleType ] = useState(null)
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false)
  const [confirmRidepanel, setconfirmRidepanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [isWaitingForDriver, setWaitingForDriver] = useState(false)
  const [ride, setRide] = useState(null)

   const navigate=useNavigate()
     const {socket}=useContext(SocketContext)
    const {user}=useContext(UserDataContext)


useEffect(()=>{
   if(user){

    socket.emit("join",{userType:"user",userId:user._id})
}
  },[user])
 

socket.on('ride-confirmed',ride=>{
  console.log(ride)
  setVehicleFound(false)
  setWaitingForDriver(true)
  setRide(ride)
})

socket.on('ride-started',ride=>{
  setWaitingForDriver(false)
    navigate('/riding',{state:{ride}})
})

const submitHandler = (e) => {
    e.preventDefault()
    // your form submission code
  }

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, 
            {
                params: { input }, // Pass query parameters correctly
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        // Assuming response.data contains an array of suggestions
        setSuggestions(response.data);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
};


  // Handle change for pickup
  const handlePickupChange = (e) => {
    const value = e.target.value
    setPickup(value)
    setActiveField("pickup")
    fetchSuggestions(value)
    if (!panelopen) setPanelopen(true)
  }

  // Handle change for destination
  const handleDestinationChange = (e) => {
    const value = e.target.value
    setDestination(value)
    setActiveField("destination")
    fetchSuggestions(value)
    if (!panelopen) setPanelopen(true)
  }
  // When a suggestion is selected, update the corresponding field
  const handleSelectSuggestion = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion)
    } else if (activeField === "destination") {
      setDestination(suggestion)
    }
    setPanelopen(false)
  }

  useGSAP(() => {
    if (panelopen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 20,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        duration: 0.5
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.5
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        padding: 0,
        y: -50,
        scale: 0.9,
        ease: 'power2.in',
        duration: 0.5
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        duration: 0.5
      })
    }
  }, [panelopen])

  // useGSAP(() => {
  //   if (vehiclePanelOpen) {
  //     gsap.to(vehiclepanelRef.current, {
  //       transform: 'translateY(0%)'
  //     })
  //   } else {
  //     gsap.to(vehiclepanelRef.current, {
  //       transform: 'translateY(100%)'
  //     })
  //   }
  // }, [vehiclePanelOpen])
  // gpt try 
  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclepanelRef.current, {
        y: 0, // Translate to 0% position
        duration: 0.5, // Animation duration
        ease: 'power2.out', // Smooth easing effect
      });
    } else {
      gsap.to(vehiclepanelRef.current, {
        y: '100%', // Translate to 100% position
        duration: 0.5, // Animation duration
        ease: 'power2.in', // Smooth easing effect
      });
    }
  }, [vehiclePanelOpen]);
  

  useGSAP(() => {
    if (confirmRidepanel) {
      gsap.to(confirmRidepanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(confirmRidepanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidepanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vechiclefoundRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vechiclefoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (isWaitingForDriver) {
      gsap.to(WaitingForDriverref.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(WaitingForDriverref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [isWaitingForDriver])



async  function findTrip(){
    setvehiclePanelOpen(true);
    setPanelopen(false)
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
      {
           params:{
            pickup, // Pass query parameters correctly
          destination
           },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }
  );

  setfare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vechicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    const { ride } = response.data;


}


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-30 h-30 absolute bottom-140 left-2' src="logo2.png" alt="Logo" />
      <div onClick={() => { setvehiclePanelOpen(false) }} className='h-screen w-screen'>
              <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-3 relative'>
          <h5 ref={panelCloseRef} onClick={() => { setPanelopen(false) }} className='absolute opacity-0 right-6 top-4 text-2xl'>
            <i className="ri-arrow-down-line"></i>
          </h5>
          <h4 className='text-xl font-semibold'>Find your perfect ride in seconds!</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-15 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setActiveField("pickup")
                setPanelopen(true)
                fetchSuggestions(pickup)
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Pick-up location?"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setActiveField("destination")
                setPanelopen(true)
                fetchSuggestions(destination)
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full"
              type="text"
              placeholder="Drop-off destination?"
            />
            
          </form>
           <button 
             onClick={findTrip}
           className='bg-black text-white px-4 py-2 rounded-lg mb-2 mt-3 w-full'>
            Find Trip
           </button>
        </div>
        <div ref={panelRef} className='bg-white mt-3'>
          <LocationSearchPanel
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            setvehiclePanelOpen={setvehiclePanelOpen}
            setPanelopen={setPanelopen}
          />
        </div>
      </div>
      <div ref={vehiclepanelRef} className="fixed z-10 w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <Vechiclepanel
          selectVehicle={setvechicleType}
        fare={fare} setconfirmRidepanel={setconfirmRidepanel} setvehiclePanelOpen={setvehiclePanelOpen} />
      </div>
      <div ref={confirmRidepanelRef} className="fixed z-10 w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRide 
        WaitingForDriver={WaitingForDriver}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vechicleType={vechicleType}
        createRide={createRide}
        setconfirmRidepanel={setconfirmRidepanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vechiclefoundRef} className="fixed z-10 w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <LookingForDriver
        pickup={pickup}
        vechicleType={vechicleType}
        destination={destination}
        fare={fare}
        setVehicleFound={setVehicleFound} />
      </div>
      <div ref={WaitingForDriverref} className="fixed z-10 w-full bottom-0 bg-white px-3 py-6 pt-12 ">
        <WaitingForDriver 
         ride={ride}
         setvehiclePanelOpen={setvehiclePanelOpen}
         setWaitingForDriver={setWaitingForDriver}
        WaitingForDriver={WaitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home