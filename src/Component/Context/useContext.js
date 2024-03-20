// import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";


 export let UseContext = createContext()

export function UseContextProvider({children}) {
   let [userToken , setToken] = useState(null)
 

  return <UseContext.Provider value={{userToken , setToken}}>
     {children}
   </UseContext.Provider>
}