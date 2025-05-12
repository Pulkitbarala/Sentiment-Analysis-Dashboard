from flask import Flask, request, jsonify
import nltk
nltk.download('vader_lexicon')
from sentiment_analysis import analyze_sentiment
from utils.text_cleaner import clean_text

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    cleaned_text = clean_text(data['text'])
    sentiment, score = analyze_sentiment(cleaned_text)
    return jsonify({'sentiment': sentiment, 'score': score})

@app.route('/')
def home():
    return "Welcome to the Sentiment Analysis Dashboard API!"

if __name__ == '__main__':
    app.run(debug=True) 