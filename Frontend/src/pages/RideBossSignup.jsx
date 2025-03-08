import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RideBossDataContext } from '../context/RideBossContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RideBosssignup = () => {

  const navigate=useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')

const [vehicleColor, setVehicleColor] = useState('')
const [vehiclePlate, setVehiclePlate] = useState('')
const [vehicleCapacity, setVehicleCapacity] = useState('')
const [vehicleType, setVehicleType] = useState('')

 const {RideBoss,setRideBoss}=useContext(RideBossDataContext)

  const SubmitHandler = async(e) => {
    e.preventDefault()
    const RideBossData={
      fullname:{
      firstname: FirstName,
      lastname: LastName,
      },
      email: email,
      password: password,
      vechicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vechicleType:vehicleType
      }
    }
   const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/Rider/register`,RideBossData)

     if(response.status===201){
      const data=response.data
      setRideBoss(data.RideBoss)
      localStorage.setItem('token',data.token)
      navigate('/RideBoss-home')
     }


    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehicleType('')
    setVehiclePlate('')
  }
  return (
        <div className='py-0 px-5 flex flex-col justify-between h-screen'>
              <div>
                 <img className="w-35 h-20 mb-0" src="/RideBosslogo1.png" alt="" />
      <form onSubmit={(e)=>{
        SubmitHandler(e)
      }}
      action="">
     <h3 className='text-lg font-medium mb-1'>What's your RideBoss name</h3>
     <div className='flex gap-4 mb-6'>
     <input
     value={FirstName}
       onChange={
          (e) => {
            setFirstName(e.target.value)
       }
      }
       required
       className='bg-[#eeeeee]  w-1/2 rounded px-4 py-1 border  text-lg placeholder:text-base'
        type="text"
         placeholder='First name' />
      <input
      onChange={
        (e) => {
          setLastName(e.target.value)
      } 
    }
      value={LastName}
       required
       className='bg-[#eeeeee]  rounded px-4 py-1 border w-1/2 text-lg placeholder:text-base'
        type="text"
         placeholder='Last name' /> 
     </div>

      <h3 className='text-lg font-medium mb-1'>what's your email</h3>
      <input
      value={email}
        onChange={
            (e) => {
              setEmail(e.target.value)
        }
      }
       required
       className='bg-[#eeeeee] mb-6 rounded px-4 py-1 border w-full text-lg placeholder:text-base'
        type="email"
         placeholder='email@example.com' />
      <h3 className='text-lg font-medium mb-1' >Enter password</h3>

      <input 
      value={password}
      onChange={
        (e) => {
          setPassword(e.target.value)
      }
    }
       className='bg-[#eeeeee] mb-6 rounded px-4 py-1 border w-full text-lg placeholder:text-base'
      required type="password" placeholder='***********' />
      <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
      <div className='flex gap-4 mb-7'>
       <input
          value={vehicleColor}
          onChange={(e) => setVehicleColor(e.target.value)}
          required
          className='bg-[#eeeeee] w-1/2 rounded px-4 py-1 border text-lg placeholder:text-base'
          type="text"
          placeholder='Vehicle Color'
        />
        <input
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
          required
          className='bg-[#eeeeee] w-1/2 rounded px-4 py-1 border text-lg placeholder:text-base'
          type="text"
          placeholder='Vehicle Plate'
        />
      </div>
      <div className='flex gap-4 mb-7'>
        <input
          value={vehicleCapacity}
          onChange={(e) => setVehicleCapacity(e.target.value)}
          required
          className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-1 border text-lg placeholder:text-base'
          type="number"
          placeholder='Vehicle Capacity'
        />
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
          className='bg-[#eeeeee] w-1/2 rounded px-2 py-1 border text-lg placeholder:text-base'
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Auto">Auto</option>
          <option value="Bike">Bike</option>
        </select>
      </div>
      <button
      className='bg-[#111] text-white  font-semibold mb-2 rounded-lg px-4 py-2  w-full text-base placeholder:text-sm'
      >Create RideBoss Account</button>
      </form>
<p className='text-center'>Already have a Account? <Link to='/RideBoss-login' className='text-blue-600 '>Login here</Link></p>
             </div>
             <div>
             <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
             Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
             </div>
      </div>
  )
}

export default RideBosssignup