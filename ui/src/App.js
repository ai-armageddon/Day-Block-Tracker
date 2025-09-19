import React, { useState, useEffect } from 'react';
import './App.css';

const TOTAL_BLOCKS = 1000; // 1000 blocks = 100% of the day
const BLOCK_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

function App() {
  const [blocksUsed, setBlocksUsed] = useState(0);
  const [lastBlockTime, setLastBlockTime] = useState(Date.now());

  useEffect(() => {
    const checkBlock = () => {
      const now = Date.now();
      const timeSinceLastBlock = now - lastBlockTime;
      
      if (timeSinceLastBlock >= BLOCK_DURATION) {
        setBlocksUsed(prev => {
          const newBlocks = prev + Math.floor(timeSinceLastBlock / BLOCK_DURATION);
          return Math.min(newBlocks, TOTAL_BLOCKS);
        });
        setLastBlockTime(now);
      }
    };

    const interval = setInterval(checkBlock, 1000);
    return () => clearInterval(interval);
  }, [lastBlockTime]);

  const percentage = Math.min((blocksUsed / TOTAL_BLOCKS) * 100, 100);
  const remainingBlocks = TOTAL_BLOCKS - blocksUsed;

  return (
    <div className="app">
      <h1>Day Block Tracker</h1>
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="stats">
        <p>Blocks used: <strong>{blocksUsed} / {TOTAL_BLOCKS}</strong></p>
        <p>Remaining: <strong>{remainingBlocks} blocks</strong></p>
        <p>Percentage: <strong>{percentage.toFixed(1)}%</strong></p>
      </div>
    </div>
  );
}

export default App;
