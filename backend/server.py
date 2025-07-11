from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
from pymongo import MongoClient
import json
import pandas as pd
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client["edp_capstone"]
items_collection = db["store_items"]
records_collection = db["records"]
data_file_path = "../data_gen/fake_items.json"

app = Flask(__name__)
cors = CORS(app)

data = list(items_collection.find())

if not data:
    with open(data_file_path, 'r') as file:
        json_data = json.load(file)
        items_collection.insert_many(json_data["items"])

@app.route('/api', methods=['GET'])
def fetch_data():
    fetched_data = list(items_collection.find())
    for item in fetched_data:
        if '_id' in item:
            item['_id'] = str(item['_id'])

    return jsonify(fetched_data)

@app.route('/api/cart', methods=['POST'])
def post_cart():
    
    data = request.json

    items = data['items']

    cur_date = datetime.now()

    data_format = {
        "user": "",
        "items": items,
        "date": cur_date.isoformat()
    }

    records_collection.insert_one(data_format)

    return jsonify(items)


if __name__ == '__main__':
    app.run(debug=True, port=5000)