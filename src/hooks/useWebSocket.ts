import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BlockMetrics } from '../types';

// Use an environment variable or a configuration file for this URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://34.210.188.43:8000';

export const useWebSocket = () => {
  const [latestMetrics, setLatestMetrics] = useState<BlockMetrics | null>(null);

  useEffect(() => {
    const socket = io(BACKEND_URL);

    socket.on('metrics_update', (data: BlockMetrics) => {
      setLatestMetrics(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return latestMetrics;
};