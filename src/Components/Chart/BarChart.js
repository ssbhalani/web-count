import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS } from "chart.js/auto"


// const useStyle = makeStyles((theme) => ({
  
// }))



const BarChart = ({chartData, optionsData}) => {
  // const classes = useStyle();
  let tempData = {
    legend: {
        display: false
    },
  }
  
  return <Bar data={chartData} options={tempData} />
};

export default BarChart;
