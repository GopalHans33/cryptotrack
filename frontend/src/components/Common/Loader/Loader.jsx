import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#111827] 
    text-violet-500 absolute z-20'>
        <CircularProgress/>
    </div>
  )
}

export default Loader