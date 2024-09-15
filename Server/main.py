from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors=CORS(app, origins='*')

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__=="__main__":
    app.run(debug=True,port=8081)