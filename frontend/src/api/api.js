import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/', // Ensure this matches your Flask server URL
});

export const analyzeSentiment = async (text) => {
  try {
    const response = await api.post('/analyze', { text });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export default api;