from flask import Flask, render_template, jsonify
import json
import requests

app = Flask(__name__)
cash = 25000

@app.route("/nasdaq_list")
def nasdaq_list():
    try:
        with open('../data/NASDAQ_list.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 500
        
@app.route("/search", methods=['GET', 'POST'])
def search():
    return 

if __name__ == "__main__":
    app.run(debug=True)
