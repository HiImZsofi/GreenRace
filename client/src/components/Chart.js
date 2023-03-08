//Imports
import "../Views/Pages.css";
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import Chart from 'chart.js/auto';

//Statistic Chart
const GreenChart = (chartData) => {
  let dark = localStorage.getItem('darkmode');
  let backgColor = "";
  let borderColor = "";
  let points = Object.values(chartData)[0]

  if (dark == "false") {
    backgColor = "#6b65db"
    borderColor = "#8983f7"
  } else {
    backgColor = "#8cad8d"
    borderColor = 'darkgreen' //Beast
  }
  
  const [data] = useState({
    labels: ['Hétfő', 'Kedd', 'Szerda', 'Csütörök', 'Péntek', 'Szombat', 'Vasárnap'],
    datasets: [
      {
        label: 'Pointjaid az elmúlt héten',
        backgroundColor: backgColor,
        borderColor: borderColor,
        data: points,
      },
    ],
  });

  return (
    <CDBContainer>
      <h3 className="mt-5">Statisztikáid:</h3>
      <Line data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default GreenChart;