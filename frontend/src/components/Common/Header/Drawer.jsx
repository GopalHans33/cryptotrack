import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AnchorTemporaryDrawer() {

    const [open, setOpen] = useState(false)

  return (
    <div>
          <IconButton onClick={()=>setOpen(true)}>
            <MenuRoundedIcon className='text-violet-500'/>
          </IconButton>
          <Drawer anchor={"right"} open={open} onClose={()=>{setOpen(false)}}>
          <div className='bg-gray-900 w-full h-full text-center'>
            <h1 className='mt-8 font-bold text-slate-100'><span className='text-violet-500'>Crypo</span>Tracker</h1>
            <ul className='text-slate-300 font-semibold'>
              <li className='m-6 hover:text-orange-500'><Link to="/register">Sign Up</Link></li>
              <li className='m-6 hover:text-[#8b5cf6] '><Link to="/">Home</Link></li>
              <li className='m-6 hover:text-[#8b5cf6] '><Link to="/compare">Compare</Link></li>
              <li className='m-6 hover:text-[#8b5cf6] '><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div> 
          </Drawer>
    </div>
  );
}