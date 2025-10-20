// import React, {useState, createContext, useContext, useEffect } from "react";
// import { authDataContext } from "./AuthContext";
// import  axios  from "axios";
// export const userDataContext = createContext();
// export default function UserContext({ children }) {
//   let {serverUrl} = useContext(authDataContext)
//   const [userData, setUserData] = useState(null)
//   const [loading, setLoading] = useState(true) 

//   const getCurrentUser= async () => {
//     try {
//       setLoading(true)
//       let result =await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
//       setUserData(result.data)
//     } catch (error) {
//       setUserData(null)
//       console.log(error)
//     } finally{
//       setLoading(false)
//     }
 
//   }
//   useEffect(()=>{
//     getCurrentUser()
//   },[])
//   let value ={
//     userData,
//     setUserData, getCurrentUser

//   }
//   return (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   );
// }
import React, {useState, createContext, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import  axios  from "axios";

export const userDataContext = createContext();

export default function UserContext({ children }) {
  let {serverUrl} = useContext(authDataContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true) 

  const getCurrentUser = async () => {
    try {
      setLoading(true)
      let result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true
      })
      setUserData(result.data)
    } catch (error) {
      // Silently handle authentication errors (expected when not logged in)
      if (error.response?.status === 400 || error.response?.status === 401) {
        // Don't log - this is normal for unauthenticated users
        setUserData(null)
      } else {
        // Only log unexpected errors
        console.error("Unexpected error fetching user:", error)
        setUserData(null)
      }
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getCurrentUser()
  }, [])

  let value = {
    userData,
    setUserData, 
    getCurrentUser,
    loading
  }

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}