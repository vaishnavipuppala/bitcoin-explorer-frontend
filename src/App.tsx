import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitcoin Explorer</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;