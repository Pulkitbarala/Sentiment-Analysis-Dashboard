import React, { useState } from 'react';
import axios from 'axios';

function InputForm() {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/analyze', { text: review });
      console.log(response.data); // Handle the response data
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Enter your review here..."
        className="textarea"
        required
      />
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Analyzing...' : 'Submit'}
      </button>
    </form>
  );
}

export default InputForm;