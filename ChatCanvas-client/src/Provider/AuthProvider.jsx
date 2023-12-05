import  { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Config/Firebase/firebase.config'
import { GoogleAuthProvider } from "firebase/auth";
import useAxios from "../api/useAxios";
import { clearCookie } from "../api/Authentication/clearCookie";



export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const axiosSecure = useAxios()

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

//   update profile 
const updateUser = (name, image)=>{
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL:image
      })
}


// login 
const login = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
}

//google 
const googleLogin = ()=>{
    setLoading(true)
    return signInWithPopup(auth, provider);
}

// observer 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)

      const loggedUser = {email: user?.email || currentUser?.email}
      // console.log(loggedUser)

            // jwt 
            if(user || currentUser?.email){
              
              axiosSecure.post("/jwt",loggedUser)
              .then((res)=>{
                // console.log(res.data)
              })
              .catch((error)=>{
                console.log(error.message)
              })
            }


    })
    return () => {
      return unsubscribe()
    }
  }, [])

              //logout
              const logOut =async()=>{
              const data = await clearCookie()
              console.log(data)
                return signOut(auth)
              }



  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    login,
    googleLogin,
    logOut
  }

  return(
     <AuthContext.Provider value={ authInfo}>
        {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider;
