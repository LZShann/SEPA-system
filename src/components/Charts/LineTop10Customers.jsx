import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, LineSeries, Tooltip, NumericAxis, AreaSeries } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

import { supabase } from "../../client";

var lineCustomSeries = [
  {
    dataSource: [0],
    xName: 'x',
    yName: 'y',
    name: 'Sales',
    type: 'Line',
  },
  {
    dataSource: [0],
    xName: 'x',
    yName: 'y',
    name: 'Sales',
    type: 'Area',
    opacity: 0.3,
    fill: '#34D399',
  },
];

var linePrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

var linePrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 20000,
  interval: 5000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

var LineTop10Customers = ({ width, height }) => {
  const userName = sessionStorage.getItem('currentUserName');
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const fetchLineData = async () => {
      let { data: lineData, error } = await supabase
        .from('sales_data_entry')
        .select('*, product:products_data_entry(*)')
        .eq('sales_man_name', userName);

      if (error) {
        setFetchError('Could not fetch data from sales_data_entry');
        setLineData(null);
        console.log('error', error);
      }

      if (lineData) {
        setFetchError(null);
        setLineData(lineData);

        var newLineChartData = [];
        var totalRevenue = 0;

        lineData.forEach((item) => {
          const revenue = item['quantity'] * item['product']['unit_price'];
          const customerId = item['customer_id'];

          totalRevenue += revenue;

          const customerIndex = newLineChartData.findIndex((item) => item['x'] === customerId);

          if (customerIndex === -1) {
            newLineChartData.push({
              x: customerId,
              y: revenue,
            });
          } else {
            newLineChartData[customerIndex]['y'] += revenue;
          }
        });

        newLineChartData.sort((a, b) => b['y'] - a['y']);

        lineCustomSeries[0]['dataSource'] = newLineChartData;
        lineCustomSeries[1]['dataSource'] = newLineChartData;

        setChartKey(prevKey => prevKey + 1);

        var titleElement = document.getElementById('top10CustomersTitle');
        titleElement.innerHTML = 'Top 10 Customers Sales';

        var highestRevenue = newLineChartData[0]['y'];
        var lowestRevenue = newLineChartData[0]['y'];

        newLineChartData.forEach((item) => {
          if (item['y'] > highestRevenue) {
            highestRevenue = item['y'];
          }

          if (item['y'] < lowestRevenue) {
            lowestRevenue = item['y'];
          }
        });

        var highestRevenueElement = document.getElementById('topCustomerSales');
        highestRevenueElement.innerHTML = 'RM ' + highestRevenue.toString();

        var lowestRevenueElement = document.getElementById('lowestCustomerSales');
        lowestRevenueElement.innerHTML = 'RM ' + lowestRevenue.toString();
      }
    };

    fetchLineData();
  }, []);

  return (
    <ChartComponent
      id="lineTop10Customers"
      key={chartKey}
      primaryXAxis={linePrimaryXAxis}
      primaryYAxis={linePrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, AreaSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineTop10Customers;
