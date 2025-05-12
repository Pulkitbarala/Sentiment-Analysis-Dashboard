import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import './SentimentAnalysis.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSentiment(null);
    setScore(null);
    setError(null);
    setLoading(true);

    if (!text.trim()) {
      setError('Please enter some text.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze', { text });
      setSentiment(response.data.sentiment);
      setScore(response.data.score);
    } catch (err) {
      setError('Error analyzing sentiment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [sentiment === 'positive' ? score : 0, sentiment === 'negative' ? score : 0, sentiment === 'neutral' ? score : 0],
        backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
      },
    ],
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="loading animate__animated animate__fadeIn">
          Loading...
        </div>
      ) : (
        <motion.div className="card shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Sentiment Analysis Dashboard</h1>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-group">
                <label htmlFor="text" className="form-label">Enter Text:</label>
                <textarea
                  id="text"
                  className="form-control"
                  value={text}
                  onChange={handleTextChange}
                  rows="4"
                  placeholder="Type your text here"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Analyze Sentiment'}
              </button>
            </form>

            {error && <div className="alert alert-danger animate__animated animate__shakeX">{error}</div>}
            {sentiment && (
              <motion.div className="mt-4" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <h3 className="text-center">Sentiment: <span className={`badge ${sentiment === 'positive' ? 'bg-success' : sentiment === 'negative' ? 'bg-danger' : 'bg-secondary'}`}>{sentiment}</span></h3>
                <h4 className="text-center">Score: <span className="badge bg-secondary">{score}</span></h4>
                <div className="d-flex justify-content-center align-items-center mt-3" style={{ width: '100%' }}>
                  <div style={{ maxWidth: '300px', width: '100%' }}>
                    <Pie data={chartData} />
                  </div>
                  <div style={{ width: '80px', height: '80px', margin: '0 20px' }}>
                    <CircularProgressbar
                      value={score * 100}
                      text={`${(score * 100).toFixed(0)}%`}
                      styles={buildStyles({
                        textColor: '#6366f1',
                        pathColor: sentiment === 'positive' ? '#10b981' : sentiment === 'negative' ? '#ef4444' : '#6b7280',
                        trailColor: '#d6d6d6',
                      })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SentimentAnalysis;