import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/userContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import RideBossContext from './context/RideBossContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RideBossContext>
     <UserContext>
     <BrowserRouter>
      <App />
    </BrowserRouter>
     </UserContext>
    </RideBossContext>
  </StrictMode>,
)
