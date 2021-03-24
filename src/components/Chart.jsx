import React from 'react';
import { HorizontalBar } from '@reactchartjs/react-chart.js';

const ChartComponent = ({ result }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: result.map(value => {
      return value.name;
    }),
    datasets: [
      {
        label: '# of Votes',
        data: result.map(value => {
          return parseInt(parseFloat(value.conf) * 100);
        }),
        backgroundColor: result.map(value => {
          const color = value.color;
          return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
        }),
        borderColor: result.map(value => {
          const color = value.color;
          return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
        }),

        borderWidth: 1,
      },
    ],
  };
  console.log(result);
  return (
    <div style={{ height: 500 }}>
      <HorizontalBar data={data} options={options} />
    </div>
  );
};
export default ChartComponent;
