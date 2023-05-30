import React, { useState, setState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { createClient } from "@supabase/supabase-js";
import { useStateContext } from '../../../contexts/ContextProvider';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

var fetchErrorFunction = null;
var stackedBarDataFunction = null;

const fetchStackedBarData = async () => {
  let { data: stackedBarData, error } = await supabase
    .from('sales_data_entry')
    .select('*, product:products_data_entry(*)')
    .eq('sales_man_name', 'TYS')

  if (error) {
    fetchErrorFunction('Could not fetch data from sales_data_entry')
    stackedBarDataFunction(null)
    console.log('error', error)
  }
  
  if (stackedBarData) {
    fetchErrorFunction(null)
    stackedBarDataFunction(stackedBarData)

    var newStackedChartData = [];
    var newStackedChartData2 = [];
    var totalRevenue = 0;

    stackedBarData.forEach((item) => {
      const revenue = item['quantity'] * item['product']['unit_price'];
      const product_name = item['product']['product_name'];

      totalRevenue += revenue;

      const productIndex = newStackedChartData.findIndex((item) => item['x'] === product_name)
      if (productIndex === -1) {
        newStackedChartData.push({
          x: product_name,
          y: revenue,
        })
      } else {
        newStackedChartData[productIndex]['y'] += revenue
      }
    })

    stackedBarData.forEach((item) => {
      const revenue = item['quantity'] * item['product']['unit_price'];
      const product_name = item['product']['product_name'];
      const percentage = (revenue / totalRevenue) * 100;
      const percentageRounded = Number(percentage.toFixed(2));

      const percentageIndex = newStackedChartData2.findIndex((item) => item['x'] === product_name)
      if (percentageIndex === -1) {
        newStackedChartData2.push({
          x: product_name,
          y: percentageRounded,
        })
      } else {
        newStackedChartData2[percentageIndex]['y'] += percentageRounded;
      }
    })

    newStackedChartData.sort((a, b) => b['y'] - a['y'])
    newStackedChartData2.sort((a, b) => b['y'] - a['y'])

    stackedCustomSeries[0]['dataSource'] = newStackedChartData;
    stackedCustomSeries[1]['dataSource'] = newStackedChartData2;

    console.log(stackedCustomSeries[0]['dataSource']);
    console.log(stackedCustomSeries[1]['dataSource']);
  }
}

fetchStackedBarData();

// var stackedChartData = [
//   [
//     { x: 'Black', y: 10800 },
//     { x: 'Red', y: 9900 },
//     { x: 'Green', y: 6360 },
//     { x: 'Golden', y: 6250 },
//     { x: 'Blue', y: 4000 },
//   ],
//   [
//     { x: 'Black', y: 2895 },
//     { x: 'Red', y: 2653 },
//     { x: 'Green', y: 1705 },
//     { x: 'Golden', y: 1675 },
//     { x: 'Blue', y: 1072 },
//   ],
// ];

var stackedCustomSeries = [
  {
    dataSource: [],
    xName: 'x',
    yName: 'y',
    name: 'Revenue',
    type: 'StackingColumn',
    background: 'blue',
  },
  {
    dataSource: [],
    xName: 'x',
    yName: 'y',
    name: 'Pencentage of Revenue ÷100',
    type: 'StackingColumn',
    background: 'red',
  },
];

var stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

var stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 1000,
  maximum: 16000,
  interval: 2000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

// onChartLoad = (args) => {
//   let chart = document.getElementById("charts");
// }

var Stacked = ({ width, height }) => {
  const { currentMode } = useStateContext();
  const [stackedBarData, setStackedBarData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  fetchErrorFunction = setFetchError;
  stackedBarDataFunction = setStackedBarData;

  return (
    <ChartComponent
      id="charts"
      //ref={chart => (chartInstance = chart)}
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    //loaded={onChartLoad.bind(this)}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
};

export default Stacked;