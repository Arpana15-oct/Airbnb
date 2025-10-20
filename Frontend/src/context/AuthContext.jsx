import React, { createContext, useState } from 'react'
export const authDataContext = createContext()

 function AuthContext({children}) {
  let serverUrl ="http://localhost:5000"
  let [loading,setloading]=useState(false)

let  value={
    serverUrl,
    loading,setloading
  }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}
export default AuthContext 