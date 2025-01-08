import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Auto-registers all necessary components
import { convertNumber } from "../../functions/convertNumber";

function LineChart({ chartData, priceType, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false, // Proper access to `legend`
      },
    },
    responsive: true,
    interaction: {
      mode: "index", // Proper spelling
      intersect: false,
    },
    scales: {
      crypto1:{
        type:"linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Crypto 1 Price", // Label for axis
        },
        ticks:{
          callback: function(value){
            if(priceType == 'prices') return '$'+value.toLocaleString();
            else{
              return '$' + convertNumber(value);
            }
          },
        },
      },
      crypto2:{
        type:"linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Crypto 2 Price", // Label for axis
        },
        ticks:{
          callback: function(value){
            if(priceType == 'prices') return '$'+value.toLocaleString();
            else{
              return '$' + convertNumber(value);
            }
          },
        },
        grid:{
          drawOnChartArea: false,
        },
      },
      x: {
        type: "category", // X-axis: Usually time or labels
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;