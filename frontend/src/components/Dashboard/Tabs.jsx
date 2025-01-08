import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from './Grid';
import List from './List';

export default function Tabs({coins}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme =createTheme({
    palette:{
        primary:{
            main:"#8b5cf6"
        }
    }
  })
  const style = {
    color:"#cbd5e1",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"Georgia",
    textTransform:"capitalize"
  }
  return (
    <div>
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <div>
                <TabList onChange={handleChange} variant='fullWidth'>
                    <Tab label="Grid" value="grid" sx={style}/>
                    <Tab label="List" value="list" sx={style}/>
                </TabList>
                </div>
                <TabPanel value="grid">
                    <div className='flex justify-center items-center flex-wrap gap-6 mx-6 my-12'>
                        {coins.map((coin,i)=>{
                            return(
                                <Grid coin={coin} key={i}/>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="list">
                    <table className='w-[95%] laptop:w-[80%] block mx-auto'>
                        {coins.map((coin,i)=>{
                            return(
                                <List hov={true} coin={coin} key={i}/>
                            )
                        })}
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    </div>
  );
}
