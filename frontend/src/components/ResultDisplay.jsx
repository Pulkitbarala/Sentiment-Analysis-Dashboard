import React from 'react';

function ResultDisplay({ sentiment, score }) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-gray-500';
      default:
        return '';
    }
  };

  return (
    <div className={`result-display ${getSentimentColor()}`}>
      <h2>Sentiment: {sentiment}</h2>
      <p>Score: {score}</p>
    </div>
  );
}

export default ResultDisplay;