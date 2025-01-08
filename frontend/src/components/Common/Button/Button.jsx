import React from 'react'

function Button({text,onClick,outline}) {
  return (
    <>
    <div onClick={()=> onClick} className={`transition ease-in-out duration-500 text-center min-w-36 rounded-full text-slate-100 border-violet-500
     px-6 py-2 border-2 ${outline ? ` hover:bg-violet-500` : 
     `hover:shadow-lg hover:shadow-violet-500/50 bg-violet-500`}`}>{text}</div>
    </>
  )
}

export default Button