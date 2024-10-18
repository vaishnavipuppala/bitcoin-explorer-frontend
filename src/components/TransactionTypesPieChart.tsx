import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Define a placeholder type for now
interface TransactionTypes {
  [key: string]: number;
}

interface Props {
  data: TransactionTypes;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionTypesPieChart: React.FC<Props> = ({ data }) => {
  const pieData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionTypesPieChart;