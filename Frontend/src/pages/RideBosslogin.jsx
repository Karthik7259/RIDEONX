import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RideBossDataContext } from '../context/RideBossContext'

const RideBosslogin = () => {
 
  const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
 
     const { Rideboss ,setRideBoss}=useContext(RideBossDataContext)
   const  navigate=useNavigate()

    const submitHandler =async (e) => {
      e.preventDefault(); 
    const Rideboss={
          email: email,
          password: password
         }
     const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/Rider/login`,Rideboss)
   if(response.status===200){
   const data=response.data;
   setRideBoss(data.Rideboss);
   localStorage.setItem('token',data.token);
   navigate('/RideBoss-home')
   }
        setEmail('')
        setPassword('')  
}
return (
    <div className='p-7 bg-cover bg-[url("/RidebossSingup.webp")] flex flex-col justify-between h-screen'>
    <div>
       <img className="w-33 h-20 mb-3 " src="/RideBosslogo1.png" alt="" />
<form onSubmit={(e)=>{
submitHandler(e)
}} action="">
<h3 className='text-lg font-medium mb-2'>what's your email</h3>

<input
required
value={email}
onChange={ 
(e
) => {
setEmail(e.target.value)
}
}
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
type="email"
placeholder='email@example.com' />

<h3 className='text-lg font-medium mb-2' >Enter password</h3>

<input 
value={password}
onChange={ 
(e
) => {
setPassword(e.target.value)
}
}
className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
required type="password" placeholder='*********' />

<button
className='bg-[#111] text-white  font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base'
>Login</button>
</form>
<p className='text-center '>Drive with Us  <Link to='/RideBoss-signup' className='text-[#32CD32]'>Register as a RideBoss</Link></p>
   </div>
   <div>
  <Link 
   to={'/login'}
  className='flex items-center justify-center bg-[#d5622d] text-white  font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'> Sign in as User</Link>
   </div>
</div>
  )
}

export default RideBosslogin