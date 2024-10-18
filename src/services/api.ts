import axios from 'axios';
import { BlockMetrics, HistoricalDataPoint } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const fetchBlockMetrics = async (): Promise<BlockMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/block_metrics`);
  return response.data;
};

export const fetchHistoricalData = async (metric: string): Promise<HistoricalDataPoint[]> => {
  const response = await axios.get(`${API_BASE_URL}/historical/${metric}`);
  return response.data;
};