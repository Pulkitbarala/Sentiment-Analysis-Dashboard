import React from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold text-center my-4">Sentiment Analysis Dashboard</h1>
      <InputForm />
      <ResultDisplay />
    </div>
  );
}

export default App;