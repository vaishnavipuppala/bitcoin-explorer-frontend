import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Props {
  data: [number, number][];
}

const VolumeChart: React.FC<Props> = ({ data }) => {
  const formattedData = data.map(([timestamp, volume]) => ({
    date: new Date(timestamp),
    volume,
  }));

  return (
    <div className="chart">
      <h2>Transaction Volume Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(date, 'MMM dd')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => format(date, 'MMM dd, yyyy')}
            formatter={(value: number) => [`${value.toFixed(2)} BTC`, 'Volume']}
          />
          <Bar dataKey="volume" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;