import React,{useContext,useEffect, useState} from 'react'
import { RideBossDataContext } from '../context/RideBossContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const RideBossProtectWrapper = ({
    children
}) => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const {RideBoss,setRideBoss}= useContext(RideBossDataContext)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{



    if(!token){
        navigate('/RideBoss-login')
    }
   },[token])

   axios.get(`${import.meta.env.VITE_BASE_URL}/Rider/profile`,{
    headers:{
        Authorization: `Bearer ${token}`,

    }
   }).then((response)=>{
    if(response.status===200){
        const data=response.data
        setRideBoss(data.RideBoss);
        setIsLoading(false)
    }
   })
   .catch(err=>{
    console.log(err)
    localStorage.removeItem('token')
    navigate('/RideBoss-login')
   })

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

export default RideBossProtectWrapper