import React, { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
function Search({search, onSearchChange}) {
  return (
    <div className='flex justify-start items-center gap-6 px-12 py-4 w-[80%] text-base mx-auto m-4 rounded-[3rem] bg-[rgb(29,41,66)] text-slate-100'>
        <SearchRoundedIcon/>
        <input placeholder='Search' onChange={(e)=>onSearchChange(e)} className='bg-[rgb(29,41,66)] outline-none border-none w-full Georgia'/>
    </div>
  )
}

export default Search