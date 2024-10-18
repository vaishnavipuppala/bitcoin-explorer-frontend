import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, className }) => {
  return (
    <div className={`metric-card ${className || ''}`}>
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
};

export default MetricCard;