import React, { useState } from 'react'
import SidebarContext from "./SidebarContext";

function SidebarContextProvider({children}) {
    let [isOpen, setIsOpen] = useState(window.innerWidth >= 1024)
  return (
    <SidebarContext.Provider value={{isOpen, setIsOpen}}>
        {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider