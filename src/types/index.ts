export interface BlockMetrics {
    block_height: number;
    tx_volume: number;
    market_price: number;
    price_change_24h: number;
    transaction_count: number;
    block_size: number;
    total_fees: number;
    difficulty: number;
    hash_rate: number;
    mempool_size: number;
  }
  
  export interface HistoricalDataPoint {
    timestamp: string;
    value: number;
  }