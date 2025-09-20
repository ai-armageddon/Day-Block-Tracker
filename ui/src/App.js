import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const TOTAL_BLOCKS = 1000; // 1000 blocks = 100% of the day
const BLOCK_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

function App() {
  const [blocksUsed, setBlocksUsed] = useState(0);
  const [lastBlockTime, setLastBlockTime] = useState(Date.now());
  const [logs, setLogs] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 50));
  }, []);

  // Send initial theme to parent on mount
  useEffect(() => {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'theme-change',
          isDarkMode: isDarkMode
        }, '*');
      }
    } catch (err) {
      console.log('Could not send initial theme to parent');
    }
  }, []);

  useEffect(() => {
    // Listen for theme changes from parent window (wrapper)
    const handleMessageFromParent = (event) => {
      if (event.data && event.data.type === 'theme-change') {
        setIsDarkMode(event.data.isDarkMode);
      }
    };
    
    window.addEventListener('message', handleMessageFromParent);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('message', handleMessageFromParent);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const checkBlock = () => {
      const now = Date.now();
      const timeSinceLastBlock = now - lastBlockTime;
      
      if (timeSinceLastBlock >= BLOCK_DURATION) {
        const blocksConsumed = Math.floor(timeSinceLastBlock / BLOCK_DURATION);
        setBlocksUsed(prev => {
          const newBlocks = prev + blocksConsumed;
          if (blocksConsumed > 0) {
            addLog(`Used ${blocksConsumed} block${blocksConsumed > 1 ? 's' : ''} (${newBlocks}/${TOTAL_BLOCKS})`);
          }
          return Math.min(newBlocks, TOTAL_BLOCKS);
        });
        setLastBlockTime(now);
      }
    };

    const interval = setInterval(checkBlock, 1000);
    return () => clearInterval(interval);
  }, [lastBlockTime, addLog]);

  const percentage = Math.min((blocksUsed / TOTAL_BLOCKS) * 100, 100);
  const remainingBlocks = TOTAL_BLOCKS - blocksUsed;

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>Day Block Tracker</h1>
        <div className="theme-toggle" onClick={() => {
          const newMode = !isDarkMode;
          setIsDarkMode(newMode);
          
          // Notify parent window (wrapper) about theme change
          try {
            if (window.parent && window.parent !== window) {
              window.parent.postMessage({
                type: 'theme-change',
                isDarkMode: newMode
              }, '*');
            }
          } catch (err) {
            console.log('Could not send theme to parent');
          }
        }}>
          {isDarkMode ? '☀️' : '🌙'}
        </div>
      </div>
      
      <div className="dashboard">
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Blocks Used</span>
            <span className="stat-value">{blocksUsed}</span>
            <span className="stat-total">/ {TOTAL_BLOCKS}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{remainingBlocks}</span>
            <span className="stat-unit">blocks</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Progress</span>
            <span className="stat-value">{percentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <div className="logs-container">
        <h3>Activity Log</h3>
        <div className="logs">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          ) : (
            <div className="log-entry">No activity yet...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
