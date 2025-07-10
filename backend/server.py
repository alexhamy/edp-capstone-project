import falsk

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
from pymongo import MongoClient
import json
import pandas as pd

client = MongoClient('mongodb://localhost:27017/')
db = client["edp_capstone"]
collection = db["store_items"]
data_file_path = "fake_items.json"

app = Flask(__name__)
cors = CORS(app)

data = list(collection.find())

if not data:
    local_data = pd.read_json(data_file_path)
    local_data = local_data.to_dict("records")

@app.route('/api', methods=['GET'])
@cross_origin()
def fetch_data():




    return res.json()