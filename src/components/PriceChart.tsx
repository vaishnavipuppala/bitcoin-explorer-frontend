import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalDataPoint } from '../types';
import { formatDate, formatUSD } from '../utils/formatters';

interface Props {
  data: HistoricalDataPoint[];
}

const PriceChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={(timestamp) => formatDate(timestamp)}
        />
        <YAxis 
          tickFormatter={(value) => formatUSD(value)}
        />
        <Tooltip 
          labelFormatter={(timestamp) => formatDate(timestamp)}
          formatter={(value) => [formatUSD(Number(value)), 'Price']}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;