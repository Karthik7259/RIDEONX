import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './pages/Start.jsx'
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import RideBosslogin from './pages/RideBosslogin.jsx'
import RideBosssignup from './pages/RideBosssignup'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import { RideBossDataContext } from './context/RideBossContext.jsx'
import RidBosshome from './pages/RidBosshome.jsx'
import RideBossProtectWrapper from './pages/RideBossProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import RidebossRiding from './components/RidebossRiding.jsx'
import Payment from './pages/payment.jsx'

const App = () => {

  return (
    <div >
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route  path='/Rideboss-Riding' element={<RidebossRiding/>}/>
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/RideBoss-login' element={<RideBosslogin/>} />
        <Route path='/RideBoss-signup' element={<RideBosssignup/>} />
        <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>} />
        <Route path='/payment' element={<Payment/>} />

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }
        />
        <Route path='/RideBoss-home' element={
          <RideBossProtectWrapper>
            <RidBosshome/ >
          </RideBossProtectWrapper>
        } />
        </Routes>
    </div>
  )
}

export default App