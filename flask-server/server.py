from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import requests
import os

app = Flask(__name__)
CORS(app)
cash = 25000

# Get the parent directory of flask-server
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

@app.route("/nasdaq_list")
def nasdaq_list():
    try:
        file_path = os.path.join(DATA_DIR, 'NASDAQ_list.json')
        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found", "path": file_path}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 500
        
@app.route("/search", methods=['GET', 'POST'])
def search():
    try:
        query = request.args.get('q', '').upper()
        file_path = os.path.join(DATA_DIR, 'NASDAQ_list.json')
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        if not query:
            return jsonify(data)
        
        filtered = [stock for stock in data if query in stock.get('symbolCode', '').upper() or query in stock.get('name', '').upper()]
        return jsonify(filtered)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)

