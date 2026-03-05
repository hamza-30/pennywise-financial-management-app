import React from 'react'

function Spinner({ message = "Loading", fullPage = "false"}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-y-3 ${fullPage ? "h-screen w-screen": "h-full w-full"}`}>
      <div 
        className={`h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#c4f82a] relative ${fullPage ? "bottom-0" : "bottom-10"}`}
      ></div>
      
      <span className={`text-sm font-semibold tracking-wide text-gray-500 uppercase relative ${fullPage ? "bottom-0" : "bottom-10"}`}>
        {message}
      </span>
    </div>
  )
}

export default Spinner