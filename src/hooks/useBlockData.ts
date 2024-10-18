import { useState, useEffect } from 'react';
import { fetchBlockMetrics, fetchHistoricalData } from '../services/api';
import { BlockMetrics, HistoricalDataPoint } from '../types';

export const useBlockData = () => {
  const [metrics, setMetrics] = useState<BlockMetrics | null>(null);
  const [historicalPrices, setHistoricalPrices] = useState<HistoricalDataPoint[]>([]);
  const [historicalVolumes, setHistoricalVolumes] = useState<HistoricalDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [metricsData, pricesData, volumesData] = await Promise.all([
          fetchBlockMetrics(),
          fetchHistoricalData('market_price'),
          fetchHistoricalData('tx_volume')
        ]);

        setMetrics(metricsData);
        setHistoricalPrices(pricesData);
        setHistoricalVolumes(volumesData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { metrics, historicalPrices, historicalVolumes, isLoading, error };
};