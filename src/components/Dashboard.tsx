import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatBTC, formatUSD, formatPercentage, formatDate } from '../utils/formatters';
import { useBlockData } from '../hooks/useBlockData';
import { useWebSocket } from '../hooks/useWebSocket';

const Dashboard: React.FC = () => {
  const { metrics, historicalPrices, historicalVolumes, isLoading, error } = useBlockData();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  useWebSocket();

  useEffect(() => {
    if (metrics) {
      setLastUpdated(new Date());
    }
  }, [metrics]);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!metrics || !historicalPrices) return null;

  const MetricCard: React.FC<{ title: string; value: string; change?: number }> = 
    ({ title, value, change }) => (
    <div className="metric-card">
      <h3>{title}</h3>
      <p>{value}</p>
      {change !== undefined && (
        <span className={`change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '▲' : '▼'} {formatPercentage(Math.abs(change))}
        </span>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <p className="last-updated">Last updated: {formatDate(lastUpdated.toISOString())}</p>
      
      <section className="metrics-section">
        <h2>Block Information</h2>
        <div className="metrics-grid">
          <MetricCard title="Block Height" value={metrics.block_height.toLocaleString()} />
          <MetricCard title="Block Size" value={`${metrics.block_size.toFixed(2)} MB`} />
          <MetricCard title="Transaction Count" value={metrics.transaction_count.toLocaleString()} />
        </div>
      </section>

      <section className="metrics-section">
        <h2>Market Data</h2>
        <div className="metrics-grid">
          <MetricCard 
            title="Market Price" 
            value={formatUSD(metrics.market_price)} 
            change={metrics.price_change_24h}
          />
          <MetricCard title="Transaction Volume" value={formatBTC(metrics.tx_volume)} />
          <MetricCard title="Total Fees" value={formatBTC(metrics.total_fees)} />
        </div>
      </section>

      <section className="metrics-section">
        <h2>Network Statistics</h2>
        <div className="metrics-grid">
          <MetricCard title="Mempool Size" value={`${metrics.mempool_size.toLocaleString()} txs`} />
          <MetricCard title="Difficulty" value={metrics.difficulty.toExponential(2)} />
          <MetricCard title="Hash Rate" value={`${metrics.hash_rate.toFixed(2)} EH/s`} />
        </div>
      </section>

      <div className="charts-container">
        <div className="chart-container">
          <h2 className="chart-title">Market Price History</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(timestamp) => formatDate(timestamp)} />
              <YAxis tickFormatter={(value) => formatUSD(value)} />
              <Tooltip 
                labelFormatter={(timestamp) => formatDate(timestamp)}
                formatter={(value) => [formatUSD(Number(value)), 'Price']}
              />
              <Line type="monotone" dataKey="value" stroke="var(--accent)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2 className="chart-title">Transaction Volume History</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalVolumes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(timestamp) => formatDate(timestamp)} />
              <YAxis tickFormatter={(value) => formatBTC(Number(value))} />
              <Tooltip 
                labelFormatter={(timestamp) => formatDate(timestamp)}
                formatter={(value) => [formatBTC(Number(value)), 'Volume']}
              />
              <Line type="monotone" dataKey="value" stroke="var(--text-secondary)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;