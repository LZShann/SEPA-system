import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

// import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/StackedBarData.js';
import { useStateContext } from '../../contexts/ContextProvider';

const stackedChartData = [
  [
      { x: 'Black', y: 10800 },
      { x: 'Red', y: 9900 },
      { x: 'Green', y: 6360 },
      { x: 'Golden', y: 6250 },
      { x: 'Blue', y: 4000 },
  ],
  [
      { x: 'Black', y: 2895 },
      { x: 'Red', y: 2653 },
      { x: 'Green', y: 1705 },
      { x: 'Golden', y: 1675 },
      { x: 'Blue', y: 1072 },
  ],
];

const stackedCustomSeries = [

  {
    dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Revenue',
    type: 'StackingColumn',
    background: 'blue',

  },

  {
    dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Pencentage of Revenue ÷100',
    type: 'StackingColumn',
    background: 'red',

  },

];

const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

const stackedPrimaryYAxis = {
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

const Stacked = ({ width, height }) => {
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;