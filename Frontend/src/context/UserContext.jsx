import React,{createContext} from 'react'
import { useState } from 'react'
export const UserDataContext = createContext()



const UserContext = ({children}) => {

       const [user, setuser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
       })

  return (
    <div>
        <UserDataContext.Provider value={{setuser,user}}>
        {children}
        </UserDataContext.Provider>
    </div>
  )
}

export  default UserContext