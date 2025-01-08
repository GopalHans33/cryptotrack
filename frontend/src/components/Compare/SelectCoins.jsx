import React, { useEffect, useState } from 'react';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { get100Coins } from '../../functions/get100Coins';

function SelectCoins({ crypto1,setLoading , crypto2, handleCoinChange }) {
  const [allCoins, setAllCoins] = useState([]);

  const style = {
    height: "2.5rem",
    color: "#8b5cf6",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#cbd5e1",
    },
    "& .MuiSvgIcon-root": {
      color: "#cbd5e1",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#8b5cf6",
      },
    },
  };
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const myCoins = await get100Coins();
      setAllCoins(myCoins);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setAllCoins([]);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center gap-6 mx-6 my-0 text-slate-100'>
        <p className='' >Crypto 1</p>
        <Select value={crypto1} label='Crypto 1' onChange={(event)=>handleCoinChange(event,false)} sx={style}>
          {allCoins.filter((item)=>item.id!=crypto2).map((coin,i) => (
            <MenuItem key={i} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
        </Select>

        <p className='' >Crypto 2</p>
        <Select value={crypto2} label='Crypto 2' onChange={(event)=>handleCoinChange(event,true)} sx={style}>
          {allCoins.filter((item)=>item.id!=crypto1).map((coin,i) => (
            <MenuItem key={i} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
        </Select>
    </div>
  );
}

export default SelectCoins;