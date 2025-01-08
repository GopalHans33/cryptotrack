import { convertDate } from "./convertDate";

export const settingChartData = (setChartData,prices1,prices2)=>{
  if(prices2){
    setChartData({
      labels: prices1.map((price)=> convertDate(price[0])),
      datasets:[
        {
          labels:'Crypto1',
          data:prices1.map((price)=> price[1]),
          borderColor:"#a78bfa",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          pointRadius: 2,
          yAxisId:"crypto1"
        },
        {
          labels:'Crypto2',
          data:prices2.map((price)=> price[1]),
          borderColor:"#f6fa8b",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          pointRadius: 2,
          yAxisId:"crypto2"
        },
      ],
    });
  }
  else{
    setChartData({
      labels: prices1.map((price)=> convertDate(price[0])),
      datasets:[
        {
          labels:'Crypto1',
          data:prices1.map((price)=> price[1]),
          borderColor:"#a78bfa",
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          backgroundColor:"rgb(221, 214, 254,0.1)",
          pointRadius: 2,
          yAxisId:"crypto1"
        },
      ],
    });
  }
}