import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './AuthContext'
import { auth, db } from '../../firebase/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if(currentUser){
                
                const userRef = doc(db, "users", currentUser.uid)

                const unsubscribeProfile = onSnapshot(userRef, (snapshot) => {
                    if(snapshot.exists()){
                        setUserProfile(snapshot.data())
                    }
                    else{
                        setUserProfile(null)
                    }
                    setLoading(false)
                }, (error) => {
                    console.log("Profile sync error:", error)
                    setLoading(false)
                })

                return () => unsubscribeProfile()
            }
            else{
                setUserProfile(null)
                setLoading(false)
            }

        })

        return () => unsubscribeAuth()
    }, [])

    const logout = () => signOut(auth)

  return (
    <>
        <AuthContext.Provider value={{user, logout, userProfile}}>
            {!loading && children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider

export function useAuthContext(){
    return useContext(AuthContext)
}