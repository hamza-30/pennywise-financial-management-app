import React from 'react'

function Spinner({ message = "Loading"}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-y-3 h-full w-full`}>
      <div 
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#c4f82a] relative bottom-10"
      ></div>
      
      <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase relative bottom-10">
        {message}
      </span>
    </div>
  )
}

export default Spinner