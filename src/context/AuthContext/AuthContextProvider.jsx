import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './AuthContext'
import { auth } from '../../firebase/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = () => signOut(auth)

  return (
    <>
        <AuthContext.Provider value={{user, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider

export function useAuthContext(){
    return useContext(AuthContext)
}