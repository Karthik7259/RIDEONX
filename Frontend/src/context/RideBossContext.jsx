import React, { createContext, useContext, useState } from 'react';

export const RideBossDataContext = createContext();


 const RideBossContext = ({ children }) => {
    const [RideBoss, setRideBoss] = useState(null);
   const [isLoading,setIsLoading] =useState(false);
   const [error,setError]=useState(null)
   
    const updateRideBoss = (data) => {
        setRideBoss(data)
    };
   const value ={
    RideBoss,
    setRideBoss,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateRideBoss
   }
    return (
        <RideBossDataContext.Provider value={value}>
            {children}
        </RideBossDataContext.Provider>
    );
};

export default RideBossContext;