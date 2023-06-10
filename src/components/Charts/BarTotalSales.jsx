import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, Tooltip, NumericAxis } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

import { supabase } from "../../client";

var barCustomSeries = [
  {
    dataSource: [0],
    xName: 'x',
    yName: 'y',
    name: 'Sales',
    type: 'Column',
  },
];

var barPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

var barPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 50000,
  interval: 10000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

var BarTotalSales = ({ width, height }) => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const fetchBarData = async () => {
      let { data: barData, error } = await supabase
        .from('sales_data_entry')
        .select('*, product:products_data_entry(*)')
        .eq('sales_man_name', 'TYS');

      if (error) {
        setFetchError('Could not fetch data from sales_data_entry');
        setBarData(null);
        console.log('error', error);
      }

      if (barData) {
        setFetchError(null);
        setBarData(barData);

        var newBarChartData = [];
        var totalRevenue = 0;

        barData.forEach((item) => {
          const revenue = item['quantity'] * item['product']['unit_price'];
          const product_name = item['product']['product_name'];

          totalRevenue += revenue;

          const productIndex = newBarChartData.findIndex((item) => item['x'] === product_name);

          if (productIndex === -1) {
            newBarChartData.push({
              x: product_name,
              y: revenue,
            });
          } else {
            newBarChartData[productIndex]['y'] += revenue;
          }
        });

        newBarChartData.sort((a, b) => b['y'] - a['y']);

        barCustomSeries[0]['dataSource'] = newBarChartData;

        console.log(barCustomSeries[0]['dataSource']);

        barCustomSeries[0]['dataSource'] = [{ x: 'Total Sales', y: totalRevenue }];

        barPrimaryYAxis.maximum = totalRevenue;
        barPrimaryYAxis.interval = totalRevenue / 5;

        setChartKey(prevKey => prevKey + 1);

        var titleElement = document.getElementById('totalSalesTitle');
        titleElement.innerHTML = 'Total Sales 2021 (Sales by Salesmen)';

        var highestRevenue = newBarChartData[0]['y'];

        newBarChartData.forEach((item) => {
          if (item['y'] > highestRevenue) {
            highestRevenue = item['y'];
          }
        });

        var highestRevenueElement = document.getElementById('totalSales');
        highestRevenueElement.innerHTML = 'RM ' + totalRevenue.toString();
      }
    };

    fetchBarData();
  }, []);

  return (
    <ChartComponent
      id="barTotalSales"
      key={chartKey}
      primaryXAxis={barPrimaryXAxis}
      primaryYAxis={barPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default BarTotalSales;
