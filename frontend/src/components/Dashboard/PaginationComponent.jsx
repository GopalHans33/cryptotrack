import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';


export default function PaginationComponent({page,handlerPageChange}) {

  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    topFunction();
  }, [page])
  

  return (
    <div className='flex justify-center items-center mb-10'>
      <Pagination count={10} page={page} onChange={(event,value)=>handlerPageChange(event,value)} 
      sx={{
        color:"#f1f5f9",
        "& .Mui-selected ":{
          backgroundColor:"#8b5cf6 !important",
          color: "#fff !important",
          borderColor:"#8b5cf6 !important"
        },
        "& .MuiPaginationItem-ellipsis":{
          border:"0px solid #334155 !important",
        },
        "& .MuiPaginationItem-text":{
          color:"#f1f5f9",
          border:"1px solid #334155"
        }
      }}
      />
    </div>
  );
}