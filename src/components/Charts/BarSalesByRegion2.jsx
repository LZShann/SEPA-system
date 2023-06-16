import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, Tooltip, DateTime, NumericAxis } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

import { supabase } from "../../client";


var barCustomSeries = [
    {
        dataSource: [0],
        xName: 'order_date',
        yName: 'percentage',
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
    valueType: 'Category',
    labelIntersectAction: 'Rotate45',
    labelPlacement: 'OnTicks',
};

var barPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 100, // Updated maximum to 100 for percentage
    interval: 20, // Updated interval to 20 for percentage
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}%', // Updated label format to display percentage
};

var BarSalesByRegion2 = ({ width, height }) => {

    const userName = sessionStorage.getItem('currentUserName');
    const { currentMode } = useStateContext();
    const [barData, setBarData] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        const fetchBarData = async () => {
            let { data: barData, error } = await supabase
                .from('sales_data_entry')
                .select('*, product:products_data_entry(*)')
                .eq('sales_man_name', userName);

            if (error) {
                setFetchError('Could not fetch data from sales_data_entry');
                setBarData(null);
                console.log('error', error);
            }

            if (barData) {
                setFetchError(null);
                setBarData(barData);

                var newBarChartData = [];
                var totalRevenueByMonth = {};

                barData.forEach((item) => {
                    const revenue = item['quantity'] * item['product']['unit_price'];
                    const orderDate = new Date(item['order_date']);
                    const month = orderDate.getMonth(); // Get the month value (0-11)

                    totalRevenueByMonth[month] = (totalRevenueByMonth[month] || 0) + revenue;
                });

                const totalRevenue = Object.values(totalRevenueByMonth).reduce((sum, revenue) => sum + revenue, 0);

                Object.keys(totalRevenueByMonth).forEach((month) => {
                    const revenue = totalRevenueByMonth[month];
                    const percentage = ((revenue / totalRevenue) * 100).toFixed(2); // Round to 2 decimal points
                    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    newBarChartData.push({
                        order_date: monthLabels[month],
                        percentage: parseFloat(percentage), // Convert the percentage back to a floating-point number
                    });
                });


                barCustomSeries[0]['dataSource'] = newBarChartData;

                setChartKey((prevKey) => prevKey + 1);

                var titleElement = document.getElementById('SalesByRegion2Title');
                titleElement.innerHTML = 'Sales By Region 2 (Grand Total %)';

                var highestPercentage = newBarChartData[0]['percentage'];
                var lowestPercentage = newBarChartData[0]['percentage'];

                newBarChartData.forEach((item) => {
                    if (item['percentage'] > highestPercentage) {
                        highestPercentage = item['percentage'];
                    }

                    if (item['percentage'] < lowestPercentage) {
                        lowestPercentage = item['percentage'];
                    }
                });

                var highestPercentageElement = document.getElementById('topSalesByRegion2');
                highestPercentageElement.innerHTML = highestPercentage.toFixed(2) + '%';

                var lowestPercentageElement = document.getElementById('lowestSalesByRegion2');
                lowestPercentageElement.innerHTML = lowestPercentage.toFixed(2) + '%';
            }
        };

        fetchBarData();
    }, []);

    return (
        <ChartComponent
            id="barSalesByRegion2"
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
            <Inject services={[ColumnSeries, Category, Legend, Tooltip, DateTime]} />
            <SeriesCollectionDirective>
                {barCustomSeries.map((item, index) => (
                    <SeriesDirective key={index} {...item} />
                ))}
            </SeriesCollectionDirective>
        </ChartComponent>
    );
};

export default BarSalesByRegion2;
