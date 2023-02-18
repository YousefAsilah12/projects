import React from 'react';
import { Doughnut, Pie} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';
export function PieChart({ chartData }) {
  return <Doughnut data={chartData}  />
}
