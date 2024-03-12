import React, { memo, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ excelData }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Desktops",
        data: excelData.map((i) => i.salary),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Salary Trends by Employee Name",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: excelData.map((i) => i.firstName),
      },
    },
  });

  console.log("Chart Render");
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={500}
          width={900}
          style={{ paddingLeft: "300px" }}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default memo(Chart);
