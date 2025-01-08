import React from 'react';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';

function Grid({ coin }) {
  return ( 
    <Link to={`/coin/${coin.id}`}>
    <div className={`w-80 h-80 bg-slate-700 border-2 border-solid border-slate-800 ${coin.price_change_percentage_24h > 0 ? `hover:border-green-400` : `hover:border-red-400`} rounded-xl`}>
      <div className='flex justify-start items-center gap-4 mx-4 my-6'>
        <img className='h-16 w-16' src={coin.image}/>
        <div className=' flex flex-col gap-2'>
            <p className='text-slate-100 uppercase font-semibold m-0'>{coin.symbol}</p>
            <p className='text-slate-400 capitalize font-light m-0'>{coin.name}</p>
        </div>
        </div>
        <div className='text-xl flex justify-start gap-4 items-center mx-4 my-6'>
            <div className={` min-w-16 ${coin.price_change_percentage_24h > 0 ? 'text-green-400 border-green-400 hover:text-white hover:bg-green-400' : 'text-red-400 border-red-400 hover:text-white hover:bg-red-400'} px-6 py-2 text-base text-center font-semibold rounded-full border-2 border-solid `}>
                {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className={`${coin.price_change_percentage_24h > 0 ? 'text-green-400 border-green-400 hover:text-white hover:bg-green-400' : 'text-red-400 border-red-400 hover:text-white hover:bg-red-400'} p-2 text-base text-center font-semibold rounded-full border-2 border-solid`}>
            {(coin.price_change_percentage_24h>0) ? <TrendingUpRoundedIcon/> : <TrendingDownRoundedIcon/>}
            </div>
        </div>
        <div className='m-6'>
            <h3 className={`font-semibold ${coin.price_change_percentage_24h > 0 ? `text-green-400` : `text-red-400`}`}>${coin.current_price.toLocaleString()}</h3>
            <p className='text-slate-300 text-lg font-medium'>
                Total Volume : {coin.total_volume.toLocaleString()}
            </p>
            <p className='text-slate-300 text-lg font-medium'>
                Market Cap : ${coin.market_cap.toLocaleString()}
            </p>
        </div>
    </div>
    </Link>
  );
}

export default Grid;
