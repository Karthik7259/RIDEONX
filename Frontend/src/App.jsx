import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import RideBosslogin from './pages/RideBosslogin.jsx'
import RideBosssignup from './pages/RideBosssignup'
import { UserDataContext } from './context/userContext.jsx'



const App = () => {

  const ans=useContext(UserDataContext);
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/RideBoss-login' element={<RideBosslogin/>} />
        <Route path='/RideBoss-signup' element={<RideBosssignup/>} />
      </Routes>
    </div>
  )
}

export default App