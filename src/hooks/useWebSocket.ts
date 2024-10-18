import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BlockMetrics } from '../types';

const SOCKET_SERVER_URL = 'http://localhost:8000';

export const useWebSocket = () => {
  const [latestMetrics, setLatestMetrics] = useState<BlockMetrics | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('metrics_update', (data: BlockMetrics) => {
      setLatestMetrics(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return latestMetrics;
};