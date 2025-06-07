import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { getPrices } from '../functions/getCoinPrices';
import { settingCoinObject } from '../functions/settingCoinObject';
import Loader from '../components/Common/Loader/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { settingChartData } from '../functions/SettingChartData';
import LineChart from '../components/LineChart/LineChart';
import PriceType from '../components/Coin/PriceType';

function Compare() {
  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('ethereum');
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(30);
  const [priceType, setPricetype] = useState('prices');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleDaysChange = async (event) => {
    setLoading(true);
    try {
      setDays(event.target.value);
      const price1 = await getPrices(crypto1, event.target.value, priceType);
      const price2 = await getPrices(crypto2, event.target.value, priceType);
      settingChartData(setChartData, price1, price2);
    } catch (error) {
      console.error('Error fetching prices on days change:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let data1 = await getCoinData(crypto1);
      let data2 = await getCoinData(crypto2);
      if (data1) settingCoinObject(data1, setCrypto1Data);
      if (data2) settingCoinObject(data2, setCrypto2Data);

      if (data1 && data2) {
        const price1 = await getPrices(crypto1, days, priceType);
        const price2 = await getPrices(crypto2, days, priceType);
        settingChartData(setChartData, price1, price2);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinChange = async (event, isCrypto2) => {
    setLoading(true);
    try {
      const selectedCrypto = event.target.value;
      // console.log('Selected Crypto:', selectedCrypto, 'isCrypto2:', isCrypto2);
      if (isCrypto2) {
        setCrypto2(selectedCrypto);
        let coinData = await getCoinData(selectedCrypto);
        settingCoinObject(coinData, setCrypto2Data);
      } else {
        setCrypto1(selectedCrypto);
        let coinData = await getCoinData(selectedCrypto);
        settingCoinObject(coinData, setCrypto1Data);
      }
      const price1 = await getPrices(crypto1, days, priceType);
      const price2 = await getPrices(crypto2, days, priceType);
      settingChartData(setChartData, price1, price2);
    } catch (error) {
      console.error('Error fetching coin data on change:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setLoading(true);
    try {
      setPricetype(newType);
      const price1 = await getPrices(crypto1, days, newType);
      const price2 = await getPrices(crypto2, days, newType);
      settingChartData(setChartData, price1, price2);
    } catch (error) {
      console.error('Error fetching prices on price type change:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const price1 = await getPrices(crypto1, days, priceType);
        const price2 = await getPrices(crypto2, days, priceType);
        settingChartData(setChartData, price1, price2);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, [crypto1, crypto2, days, priceType]);

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex-wrap sm:flex sm:justify-start justify-center items-center m-6 gap-8">
            <SelectCoins crypto1={crypto1} crypto2={crypto2} setLoading = {setLoading} handleCoinChange={handleCoinChange} />
            <SelectDays days={days} setLoading={setLoading} handleDaysChange={handleDaysChange} isPTag={true} />
          </div>
          <div className="bg-[#1d2942] rounded-xl my-1">
            <List hov={false} coin={crypto1Data} />
          </div>
          <div className="bg-[#1d2942] rounded-xl my-1">
            <List hov={false} coin={crypto2Data} />
          </div>
          <div className="bg-[#1d2942] rounded-xl">
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </div>
      )}
    </div>
  );
}

export default Compare;
