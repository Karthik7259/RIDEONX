import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from './context/userContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import RideBossContext from './context/RideBossContext.jsx';
import SocketProvider from './context/SocketIOContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RideBossContext>
        <UserContext>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </SocketProvider>
        </UserContext>
      </RideBossContext> 
  </StrictMode>,
);
