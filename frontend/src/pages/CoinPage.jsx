import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/LineChart/LineChart";
import SelectDays from "../components/Coin/SelectDays";
import PriceType from "../components/Coin/PriceType";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import List from "../components/Dashboard/List";
import { getCoinData } from "../functions/getCoinData";
import { settingCoinObject } from "../functions/settingCoinObject";
import { getPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/SettingChartData";

function CoinPage() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  let i = 1;

  useEffect(() => {
    if(id){
      getData();
    }
  },[id,days,priceType]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id);
    settingCoinObject(coinData,setCoin);
    if(coinData){
      const price = await getPrices(id,days,priceType,error);
      if(price){
        settingChartData(setChartData,price);
        setLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
  
    const prices = await getPrices(id, event.target.value, priceType,error);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };   

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getPrices(id, days, event.target.value,setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
  };
  
  

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : coin ? (
        <div className="w-[90%] block my-6 mx-auto">
          <div className="bg-[#1d2942] rounded-xl">
            <List hov={false} coin={coin} />
          </div>
          <div className="bg-[#1d2942] rounded-xl">
            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>
          <div className="bg-[#1d2942] rounded-xl">
            <CoinInfo heading={coin.name} desc={coin.desc} />
          </div>
        </div>
      ) : (
        <div>No data available for this coin.</div>
      )}
    </div>
  );
}

export default CoinPage;