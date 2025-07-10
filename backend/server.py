from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
from pymongo import MongoClient
import json
import pandas as pd

client = MongoClient('mongodb://localhost:27017/')
db = client["edp_capstone"]
collection = db["store_items"]
data_file_path = "../data_gen/fake_items.json"

app = Flask(__name__)
cors = CORS(app)

data = list(collection.find())

if not data:
    with open(data_file_path, 'r') as file:
        json_data = json.load(file)
        collection.insert_many(json_data["items"])

@app.route('/api', methods=['GET'])
def fetch_data():

    fetched_data = list(collection.find())

    for item in fetched_data:
        if '_id' in item:
            item['_id'] = str(item['_id'])

    return jsonify(fetched_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)