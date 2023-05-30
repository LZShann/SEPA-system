import React, { useState, useEffect } from 'react';
// Stacked Bar Chart Component From Syncfusion
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

// Database
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Stacked Bar Chart Data Source passing and X,Y Axis Name
var stackedCustomSeries2 = [
  {
    dataSource: [0],
    xName: 'x',
    yName: 'y',
    name: 'Revenue',
    type: 'StackingColumn',
  },
  {
    dataSource: [1],
    xName: 'x',
    yName: 'y',
    name: 'Pencentage of Revenue ÷100',
    type: 'StackingColumn',
  },
];

// Stacked Bar Chart Pattern/Style
var stackedPrimaryXAxis2 = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};
var stackedPrimaryYAxis2 = {
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


var StackedTotalSales = ({ width, height }) => {
  const { currentMode } = useStateContext();
  // Data Setter
  const [stackedBarData2, setStackedBarData2] = useState(null);
  // Error Setter *Used when error occur
  const [fetchError2, setFetchError2] = useState(null);
  // Key Prop
  const [chartKey2, setChartKey] = useState(0);

  useEffect(() => {
    // Function to fetch data from database
    const fetchStackedBarData2 = async () => {
      let { data: stackedBarData2, error } = await supabase
        .from('sales_data_entry') // Table name
        .select('*, product:products_data_entry(*)') // Select all data from sales_data_entry and foreign key - product from products_data_entry & select all
        .eq('sales_man_name', 'TYS'); // equal to sales man name LWH *Can change the LWH to other sales man name

      if (error) { // for error checking only 
        setFetchError2('Could not fetch data from sales_data_entry');
        setStackedBarData2(null);
        console.log('error', error);
      }

      if (stackedBarData2) {
        setFetchError2(null);
        setStackedBarData2(stackedBarData2); // if data found when be here. Use stackedBarData to do the data manipulation

        var newStackedChartData = []; // used to find revenue
        var newStackedChartData2 = []; // used to find revenue percentage
        var totalRevenue = 0; // used to find total revenue

        stackedBarData2.forEach((item) => {
          const revenue = item['quantity'] * item['product']['unit_price']; // revenue formula
          const product_name = item['product']['product_name']; // product name

          totalRevenue += revenue; // total revenue

          // find the product name in the array and add the revenue to the product name
          const productIndex = newStackedChartData.findIndex((item) => item['x'] === product_name);
          // if product name not found in the array, push the product name and revenue to the array
          if (productIndex === -1) {
            newStackedChartData.push({
              x: product_name,
              y: revenue,
            });
          } else {
            // if product name found in the array, add the revenue to the product name
            newStackedChartData[productIndex]['y'] += revenue;
          }
        });
        // reuse the newStackedChartData to find the percentage
        newStackedChartData.forEach((item) => {
          const revenue = item['y'];
          // calculate the percentage
          const percentage = (revenue / totalRevenue) * 10000;
          const percentageRounded = Number(percentage.toFixed(2)); // limit the percentage to 2 decimal places

          // push the product name and percentage to the array
          newStackedChartData2.push({
            x: item['x'],
            y: percentageRounded,
          });
        });

        // Sort the array from highest to lowest
        newStackedChartData.sort((a, b) => b['y'] - a['y']);
        newStackedChartData2.sort((a, b) => b['y'] - a['y']);

        // set the newStackedChartData and newStackedChartData2 to the dataSource
        stackedCustomSeries2[0]['dataSource'] = newStackedChartData;
        stackedCustomSeries2[1]['dataSource'] = newStackedChartData2;

        // check the output for revenue and percentage of revenue, it same as 'console.log(newStackedChartData);'
        console.log(stackedCustomSeries2[0]['dataSource']);
        console.log(stackedCustomSeries2[1]['dataSource']);

        // set the chartKey to re-render the chart
        setChartKey(prevKey => prevKey + 1);

        // HTML update for title, highest revenue, lowest revenue and highest revenue percentage
        var titleElement = document.getElementById('totalSalesTitle');
        titleElement.innerHTML = 'Total Sales 2021 (Sales by Salesmen)';

        // Allocate the first element as the highest and lowest revenue
        var highestRevenue = newStackedChartData[0]['y'];

        // Use loop if the next value higheer or lower than the previous value, replace the value
        newStackedChartData.forEach((item) => {
          if (item['y'] > highestRevenue) {
            highestRevenue = item['y'];
          }
        });

        var highestRevenueElement = document.getElementById('totalSales');
        highestRevenueElement.innerHTML = 'RM ' + highestRevenue.toString();
      }
    };

    fetchStackedBarData2();
  }, []);

  return (
    <ChartComponent
      key={chartKey2}
      primaryXAxis={stackedPrimaryXAxis2}
      primaryYAxis={stackedPrimaryYAxis2}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries2.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default StackedTotalSales;
