// import React, { useState, useEffect } from 'react';
// // Stacked Bar Chart Component From Syncfusion
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
// import { useStateContext } from '../../contexts/ContextProvider';

// // Database
// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Stacked Bar Chart Data Source passing and X,Y Axis Name
// var stackedCustomSeries = [
//   {
//     dataSource: [0],
//     xName: 'x',
//     yName: 'y',
//     name: 'Revenue',
//     type: 'StackingColumn',
//   },
//   {
//     dataSource: [1],
//     xName: 'x',
//     yName: 'y',
//     name: 'Pencentage of Revenue ÷100',
//     type: 'StackingColumn',
//   },
// ];

// // Stacked Bar Chart Pattern/Style
// var stackedPrimaryXAxis = {
//   majorGridLines: { width: 0 },
//   minorGridLines: { width: 0 },
//   majorTickLines: { width: 0 },
//   minorTickLines: { width: 0 },
//   interval: 1,
//   lineStyle: { width: 0 },
//   labelIntersectAction: 'Rotate45',
//   valueType: 'Category',
// };
// var stackedPrimaryYAxis = {
//   lineStyle: { width: 0 },
//   minimum: 0,
//   maximum: 24000,
//   interval: 2000,
//   majorTickLines: { width: 0 },
//   majorGridLines: { width: 1 },
//   minorGridLines: { width: 1 },
//   minorTickLines: { width: 0 },
//   labelFormat: '{value}',
// };


// var StackedTopSalesProduct = ({ width, height }) => {
//   const { currentMode } = useStateContext();
//   // Data Setter
//   const [stackedBarData, setStackedBarData] = useState(null);
//   // Error Setter *Used when error occur
//   const [fetchError, setFetchError] = useState(null);
//   // Key Prop
//   const [chartKey, setChartKey] = useState(0);

//   useEffect(() => {
//     // Function to fetch data from database
//     const fetchStackedBarData = async () => {
//       let { data: stackedBarData, error } = await supabase
//         .from('sales_data_entry') // Table name
//         .select('*, product:products_data_entry(*)') // Select all data from sales_data_entry and foreign key - product from products_data_entry & select all
//         .eq('sales_man_name', 'TKZ'); // equal to sales man name LWH *Can change the LWH to other sales man name

//       if (error) { // for error checking only 
//         setFetchError('Could not fetch data from sales_data_entry');
//         setStackedBarData(null);
//         console.log('error', error);
//       }

//       if (stackedBarData) {
//         setFetchError(null);
//         setStackedBarData(stackedBarData); // if data found when be here. Use stackedBarData to do the data manipulation

//         var newStackedChartData = []; // used to find revenue
//         var newStackedChartData2 = []; // used to find revenue percentage
//         var totalRevenue = 0; // used to find total revenue

//         stackedBarData.forEach((item) => {
//           // console log the data from database
//           // console.log(item['product']['product_name']);
//           // console.log(item['quantity']);

//           const revenue = item['quantity'] * item['product']['unit_price']; // revenue formula
//           const product_name = item['product']['product_name']; // product name

//           totalRevenue += revenue; // total revenue

//           // find the product name in the array and add the revenue to the product name
//           const productIndex = newStackedChartData.findIndex((item) => item['x'] === product_name);
//           // if product name not found in the array, push the product name and revenue to the array
//           if (productIndex === -1) {
//             newStackedChartData.push({
//               x: product_name,
//               y: revenue,
//             });
//           } else {
//             // if product name found in the array, add the revenue to the product name
//             newStackedChartData[productIndex]['y'] += revenue;
//           }
//         });
//         // reuse the newStackedChartData to find the percentage
//         newStackedChartData.forEach((item) => {
//           const revenue = item['y'];
//           // calculate the percentage
//           const percentage = (revenue / totalRevenue) * 10000;
//           const percentageRounded = Number(percentage.toFixed(2)); // limit the percentage to 2 decimal places

//           // push the product name and percentage to the array
//           newStackedChartData2.push({
//             x: item['x'],
//             y: percentageRounded,
//           });
//         });

//         // Sort the array from highest to lowest
//         newStackedChartData.sort((a, b) => b['y'] - a['y']);
//         newStackedChartData2.sort((a, b) => b['y'] - a['y']);

//         // set the newStackedChartData and newStackedChartData2 to the dataSource
//         stackedCustomSeries[0]['dataSource'] = newStackedChartData;
//         stackedCustomSeries[1]['dataSource'] = newStackedChartData2;

//         // check the output for revenue and percentage of revenue, it same as 'console.log(newStackedChartData);'
//         console.log(stackedCustomSeries[0]['dataSource']);
//         console.log(stackedCustomSeries[1]['dataSource']);

//         // set the chartKey to re-render the chart
//         setChartKey(prevKey => prevKey + 1);

//         // HTML update for title, highest revenue, lowest revenue and highest revenue percentage
//         var titleElement = document.getElementById('topSalesProductTitle');
//         titleElement.innerHTML = 'Top Sales Product (Grand Total %)';

//         // Allocate the first element as the highest and lowest revenue
//         var highestRevenue = newStackedChartData[0]['y'];
//         var lowestRevenue = newStackedChartData[0]['y'];
//         // Use loop if the next value higheer or lower than the previous value, replace the value
//         newStackedChartData.forEach((item) => {
//           if (item['y'] > highestRevenue) {
//             highestRevenue = item['y'];
//           }

//           if (item['y'] < lowestRevenue) {
//             lowestRevenue = item['y'];
//           }
//         });

//         var highestRevenueElement = document.getElementById('highestRevenue');
//         highestRevenueElement.innerHTML = 'RM ' + highestRevenue.toString();

//         var lowestRevenueElement = document.getElementById('lowestRevenue');
//         lowestRevenueElement.innerHTML = 'RM ' + lowestRevenue.toString();

//         // Same Loop logic but is for percentage
//         var highestPercentage = newStackedChartData2[0]['y'];
//         newStackedChartData2.forEach((item) => {
//           if (item['y'] > highestPercentage) {
//             highestPercentage = item['y'];
//           }
//         });

//         // round the percentage to 2 decimal places
//         var highestPercentageRounded = highestPercentage * 0.01;
//         var highestPercentageElement = document.getElementById('highestRevenuePercentage');
//         highestPercentageElement.innerHTML = highestPercentageRounded.toFixed(2).toString() + ' %';
//       }
//     };

//     fetchStackedBarData();
//   }, []);

//   return (
//     <ChartComponent
//       key={chartKey}
//       primaryXAxis={stackedPrimaryXAxis}
//       primaryYAxis={stackedPrimaryYAxis}
//       width={width}
//       height={height}
//       chartArea={{ border: { width: 0 } }}
//       tooltip={{ enable: true }}
//       background={currentMode === 'Dark' ? '#33373E' : '#fff'}
//       legendSettings={{ background: 'white' }}
//     >
//       <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
//       <SeriesCollectionDirective>
//         {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
//       </SeriesCollectionDirective>
//     </ChartComponent>
//   );
// };

// export default StackedTopSalesProduct;
