import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-community';
import { useState } from 'react';

const BasicBarLinear = () => {
  const [chartOptions] = useState<AgChartOptions>({
    height: 500,
    title: {
      text: 'Ice Cream Sales and Average Temperature',
    },
    subtitle: {
      text: 'Based on data from 2024',
    },
    legend: {
      enabled: true,
      position: 'right',
    },
    data: [
      { month: 'Mar', avgTemp: 3.2, iceCreamSales: 130000 },
      { month: 'Apr', avgTemp: 8.7, iceCreamSales: 135000 },
      { month: 'May', avgTemp: 14.2, iceCreamSales: 140000 },
      { month: 'Jun', avgTemp: 18.7, iceCreamSales: 250000 },
      { month: 'Jul', avgTemp: 22.2, iceCreamSales: 280000 },
      { month: 'Aug', avgTemp: 21.7, iceCreamSales: 260000 },
      { month: 'Sep', avgTemp: 16.2, iceCreamSales: 200000 },
      { month: 'Oct', avgTemp: 11.7, iceCreamSales: 180000 },
    ],
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'iceCreamSales',
        yName: 'Ice Cream Sales',
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'avgTemp',
        yName: 'Average Temperature',
      },
    ],
    axes: [
      {
        position: 'bottom',
        type: 'category',
      },
      {
        position: 'right',
        type: 'number',
        keys: ['iceCreamSales'],
        label: {
          formatter: (params) => {
            return `${parseFloat(params.value).toLocaleString()} units`;
          },
        },
      },
      {
        position: 'left',
        type: 'number',
        keys: ['avgTemp'],
        label: {
          formatter: (params) => {
            return `${params.value}°C`;
          },
        },
      },
    ],
  });

  return (
    <>
      <div id="my-chart" className="w-full" />
      <AgCharts options={chartOptions} />
    </>
  );
};

export default BasicBarLinear;
