//Imports
import "../Views/Pages.css";
import React, { useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import Chart from 'chart.js/auto';

//Statistic Chart
const GreenChart = () => {
  const [chartData, setChartData] = useState([]);
  let dark = localStorage.getItem('darkmode');
  let backgColor = "";
  let borderColor = "";

  //Getting data form Server for the User Statistic Chart
  useEffect(() => {
    const token = localStorage.getItem("key");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, 
      },
      withCredentials: true,
    };
    fetch("http://localhost:3001/chartData", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        //setting chart data
        if (data !== undefined) {
          const pointlist = [];
          for (let i = 0; i < 10; i++) {
            if (i < data.chartdata.length) {
              pointlist.push(data.chartdata[i].emission);
            } else {
              pointlist.push(0.0);
            }
          }
          setChartData(pointlist);
        }
      }
    );
  }, []);

  //Colors
  if (dark == "false") {
    backgColor = "#6b65db"
    borderColor = "#8983f7"
  } else {
    backgColor = "#8cad8d"
    borderColor = 'darkgreen' //Beast
  }
  
  //Chart structure
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: 'Legutóbbi 10 utad pontjai:',
        backgroundColor: backgColor,
        borderColor: borderColor,
        data: chartData,
      },
    ],
  };
  
  return (
    <CDBContainer>
      <h3 className="mt-3">Statisztikáid:</h3>
      <Bar data={data} width="100%" height="35vh" />
    </CDBContainer>
  );
};

export default GreenChart;