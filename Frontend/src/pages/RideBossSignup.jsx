import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const RideBosssignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  const SubmitHandler = (e) => {
    e.preventDefault()
    setUserData({
      fullName:{
      firstName: FirstName,
      lastName: LastName,
      },
      email: email,
      password: password
      
    })
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
        <div className='py-5 px-5 flex flex-col justify-between h-screen'>
              <div>
                 <img className="w-35 h-20 mb-3" src="/RideBosslogo1.png" alt="" />
      <form onSubmit={(e)=>{
        SubmitHandler(e)
      }}
      action="">
     <h3 className='text-lg font-medium mb-2'>What's your RideBoss name</h3>
     <div className='flex gap-4 mb-6'>
     <input
     value={FirstName}
       onChange={
          (e) => {
            setFirstName(e.target.value)
       }
      }
       required
       className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
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
       className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
        type="text"
         placeholder='Last name' /> 
     </div>

      <h3 className='text-lg font-medium mb-2'>what's your email</h3>
      <input
      value={email}
        onChange={
            (e) => {
              setEmail(e.target.value)
        }
      }
       required
       className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email"
         placeholder='email@example.com' />

      <h3 className='text-lg font-medium mb-2' >Enter password</h3>

      <input 
      value={password}
      onChange={
        (e) => {
          setPassword(e.target.value)
      }
    }
       className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      required type="password" placeholder='*********' />

      <button
      className='bg-[#111] text-white  font-semibold mb-2 rounded px-4 py-2  w-full text-base placeholder:text-sm'
      >Login</button>
      </form>
<p className='text-center'>Already have a Account? <Link to='/RideBoss-login' className='text-blue-600 '>Login here</Link></p>
             </div>
             <div>
             <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
             Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
             </div>
      </div>
  )
}

export default RideBosssignup