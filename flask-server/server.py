from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route("/", methods=['GET'])
def mainPage():
    if requests.method == 'GET':
        return render_template("App")
    return "<p>Hi</p>"

if __name__ == "__main__":
    app.run(debug=True)
