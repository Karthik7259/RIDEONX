import React,{useContext,useEffect, useState} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProtectWrapper = ({
    children
}) => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const {user,setuser}=useContext(UserDataContext);
    const [isLoading,setIsLoading]=useState(true);
   useEffect(()=>{
    if(!token){
        navigate('/login')
    }
   axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   }).then((response)=>{
    if(response.status===200){
      const data=response.data;
      setuser(data.user);
      setIsLoading(false)
    }
   })
   .catch(err=>{
    console.log(err)
    localStorage.removeItem('token')
    navigate('/login')
   })

 
 },[token])

 if(isLoading){
  return(
    <div>Loading...</div>
  )
 }
  return (
    <>
     {children}
    </>
  )
}

export default UserProtectWrapper