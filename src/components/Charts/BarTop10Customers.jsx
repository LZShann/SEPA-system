import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, Tooltip, NumericAxis } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  maximum: 20000,
  interval: 5000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

var BarTop10Customers = ({ width, height }) => {
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
          const customerId = item['customer_id'];

          totalRevenue += revenue;

          const customerIndex = newBarChartData.findIndex((item) => item['x'] === customerId);

          if (customerIndex === -1) {
            newBarChartData.push({
              x: customerId,
              y: revenue,
            });
          } else {
            newBarChartData[customerIndex]['y'] += revenue;
          }
        });

        newBarChartData.sort((a, b) => b['y'] - a['y']);

        barCustomSeries[0]['dataSource'] = newBarChartData;

        //barPrimaryYAxis.maximum = totalRevenue;
        //barPrimaryYAxis.interval = totalRevenue / 5;

        setChartKey(prevKey => prevKey + 1);

        var titleElement = document.getElementById('top10CustomersTitle');
        titleElement.innerHTML = 'Top 10 Customers Sales';

        var highestRevenue = newBarChartData[0]['y'];
        var lowestRevenue = newBarChartData[0]['y'];
        

        newBarChartData.forEach((item) => {
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

    fetchBarData();
  }, []);

  return (
    <ChartComponent
      id="barTop10Customers"
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

export default BarTop10Customers;