import "../Views/Pages.css";
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import Chart from 'chart.js/auto';

const GreenChart = () => {
  let dark = localStorage.getItem('darkmode');
  let backgColor = "";
  let borderColor = "";
  if (dark == "false") {
    backgColor = "#6b65db"
    borderColor = "#8983f7"
  } else {
    backgColor = "#8cad8d"
    borderColor = 'darkgreen' //Beast
  }
  const [data] = useState({
    labels: ['Jan', 'Febr', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl','Aug','Szept','Okt','Nov','Dec'],
    datasets: [
      {
        label: 'Pointjaid hónaponként',
        backgroundColor: backgColor,
        borderColor: borderColor,
        data: [40, 50, 62, 74, 46, 36, 26, 44, 31, 54, 88, 51],
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