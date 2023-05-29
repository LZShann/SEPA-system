import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);


// const [stackedBarData, setStackedBarData] = useState(null);
// const [fetchError, setFetchError] = useState(null);

// const fetchStackedBarData = async () => {
//     let { data: stackedBarData, error } = await supabase
//         .from('sales_data_entry')
//         .select('*')
//     if (error){
//         setFetchError('Could not fetch data from sales_data_entry')
//         setStackedBarData(null)
//         console.log('error', error)
//     } 
//     if (stackedBarData){
//         setFetchError(null)
//         setStackedBarData(stackedBarData)
//         console.log('stackedBarData', stackedBarData)
//     }
// }
// fetchStackedBarData();


// export const stackedChartData = [
//     [
//         { x: 'Black', y: 10800 },
//         { x: 'Red', y: 9900 },
//         { x: 'Green', y: 6360 },
//         { x: 'Golden', y: 6250 },
//         { x: 'Blue', y: 4000 },
//     ],
//     [
//         { x: 'Black', y: 2895 },
//         { x: 'Red', y: 2653 },
//         { x: 'Green', y: 1705 },
//         { x: 'Golden', y: 1675 },
//         { x: 'Blue', y: 1072 },
//     ],
// ];

// export const stackedCustomSeries = [

//     {
//         dataSource: stackedChartData[0],
//         xName: 'x',
//         yName: 'y',
//         name: 'Revenue',
//         type: 'StackingColumn',
//         background: 'blue',

//     },

//     {
//         dataSource: stackedChartData[1],
//         xName: 'x',
//         yName: 'y',
//         name: 'Pencentage of Revenue ÷100',
//         type: 'StackingColumn',
//         background: 'red',

//     },

// ];

// export const stackedPrimaryXAxis = {
//     majorGridLines: { width: 0 },
//     minorGridLines: { width: 0 },
//     majorTickLines: { width: 0 },
//     minorTickLines: { width: 0 },
//     interval: 1,
//     lineStyle: { width: 0 },
//     labelIntersectAction: 'Rotate45',
//     valueType: 'Category',
// };

// export const stackedPrimaryYAxis = {
//     lineStyle: { width: 0 },
//     minimum: 1000,
//     maximum: 16000,
//     interval: 2000,
//     majorTickLines: { width: 0 },
//     majorGridLines: { width: 1 },
//     minorGridLines: { width: 1 },
//     minorTickLines: { width: 0 },
//     labelFormat: '{value}',
// };