import React, { useState, useEffect } from 'react';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../functions/convertNumber';
import { Link } from 'react-router-dom';


function List({ hov, coin }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Tailwind's `md` breakpoint is 768px
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Link to={`/coin/${coin.id}`}>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <tr className={`text-[80%] laptop:text-[100%] flex justify-between items-center gap-2 m-6 p-4 rounded-2xl ${hov ? 'hover:bg-[#2e4576]' : ''} transition-all duration-300`}>
          <Tooltip title="Coin Logo" placement="bottom-start">
            <td className="text-left w-12 mr-4">
              <img className="" src={coin.image} alt={`${coin.name} logo`} />
            </td>
          </Tooltip>

          <Tooltip title="Coin Info" placement="bottom-start">
            <td className="text-left w-[18%]">
              <div className="flex flex-col gap-2">
                <p className="text-slate-100 uppercase font-semibold m-0">{coin.symbol}</p>
                <p className="text-slate-400 capitalize font-light m-0">{coin.name}</p>
              </div>
            </td>
          </Tooltip>

          <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
            <td className="text-left w-[50%] sm:w-[18%]">
              <div className="text-xl flex justify-start gap-4 items-center mx-4 my-6">
                <div
                  className={`${
                    coin.price_change_percentage_24h > 0
                      ? 'text-green-400 border-green-400 hover:text-white hover:bg-green-400'
                      : 'text-red-400 border-red-400 hover:text-white hover:bg-red-400'
                  } px-6 py-2 text-base text-center font-semibold rounded-full border-2 border-solid`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2) ?? 'N/A'}%
                </div>
                <div
                  className={`${
                    coin.price_change_percentage_24h > 0
                      ? 'text-green-400 border-green-400 hover:text-white hover:bg-green-400'
                      : 'text-red-400 border-red-400 hover:text-white hover:bg-red-400'
                  } p-2 text-base text-center font-semibold rounded-full border-2 border-solid hidden md:block`}
                >
                  {coin.price_change_percentage_24h > 0 ? (
                    <TrendingUpRoundedIcon />
                  ) : (
                    <TrendingDownRoundedIcon />
                  )}
                </div>
              </div>
            </td>
          </Tooltip>

          <Tooltip title="Current Price" placement="bottom">
            <td
              className={`hidden sm:block text-center w-[18%] font-semibold ${
                coin.price_change_percentage_24h > 0 ? `text-green-400` : `text-red-400`
              }`}
            >
              {coin.current_price !== undefined && coin.current_price !== null 
  ? '$' + coin.current_price.toLocaleString() 
  : 'N/A'}

            </td>
          </Tooltip>

          <Tooltip title="Total Volume" placement="bottom">
            <td className="hidden xl:block text-right w-[18%] text-slate-300 text-lg font-medium">
              {coin.total_volume !== undefined && coin.total_volume !== null 
  ? '$' + coin.total_volume.toLocaleString() 
  : 'N/A'}
            </td>
          </Tooltip>

          <Tooltip title="Market Capital" placement="bottom">
              <td className="hidden sm:block text-right w-[18%] text-slate-300 text-lg font-medium">
                {isSmallScreen ? (
                  <div className="text-center">
                    ${coin.market_cap !== undefined && coin.market_cap !== null 
                      ? convertNumber(coin.market_cap) 
                      : 'N/A'}
                  </div>
                ) : (
                  <div>
                    ${coin.market_cap !== undefined && coin.market_cap !== null 
                      ? coin.market_cap.toLocaleString() 
                      : 'N/A'}
                  </div>
                )}
              </td>
            </Tooltip>

        </tr>
      </tbody>
    </table>
    </Link>
  );
}

export default List;