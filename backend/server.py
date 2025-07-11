from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
from pymongo import MongoClient
import json
import pandas as pd
from datetime import datetime
import uuid
import pickle
import numpy as np
import pandas as pd
import json

from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import numpy as np
import json

# Load orders from fake_orders.json
with open("fake_orders_grouped.json", "r", encoding='utf-8') as f:
    data = json.load(f)
    orders = data['orders']  # Keep orders as a list of lists

# Extract all unique categories for each feature
materials = list(set(item['Material'] for order in orders for item in order))
seasons = list(set(item['Season'] for order in orders for item in order))
types = list(set(item['Type'] for order in orders for item in order))
categories = list(set(item['Category'] for order in orders for item in order))

# Convert categorical data to numerical format
encoder = OneHotEncoder(categories=[materials, seasons, types, categories], handle_unknown='ignore')
material_encoded = encoder.fit_transform([[item['Material'], item['Season'], item['Type'], item['Category']] for order in orders for item in order]).toarray()

# Normalize numerical data
scaler = StandardScaler()
price_normalized = scaler.fit_transform([[item['Price']] for order in orders for item in order])
rating_normalized = scaler.fit_transform([[item['Rating']] for order in orders for item in order])
id_normalized = scaler.fit_transform([[item['id']] for order in orders for item in order])

# Create feature vectors for each item
item_features = np.hstack((material_encoded, price_normalized, rating_normalized, id_normalized))

# Fit Nearest Neighbors model using individual item features
nn = NearestNeighbors(n_neighbors=5)
nn.fit(item_features)

# Function to aggregate features for an order
def aggregate_order_features(order):
    aggregated_features = np.mean([
        np.hstack((
            encoder.transform([[item['Material'], item['Season'], item['Type'], item['Category']]]).toarray(),
            scaler.transform([[item['Price']]]),
            scaler.transform([[item['Rating']]]),
            scaler.transform([[item['id']]])
        ))
        for item in order
    ], axis=0)
    return aggregated_features.flatten()  # Ensure it's a 1D array



client = MongoClient('mongodb://localhost:27017/')
db = client["edp_capstone"]
items_collection = db["store_items"]
records_collection = db["records"]
billing_collection = db["billing"]

data_file_path = "../data_gen/fake_items.json"

app = Flask(__name__)
cors = CORS(app)

data = list(items_collection.find())

if not data:
    with open(data_file_path, 'r') as file:
        json_data = json.load(file)
        items_collection.insert_many(json_data["items"])


model_filename = "combined_data.pkl"
with open(model_filename, 'rb') as file:
    loaded_model = pickle.load(file)


@app.route('/api', methods=['GET'])
def fetch_data():
    fetched_data = list(items_collection.find())
    for item in fetched_data:
        if '_id' in item:
            item['_id'] = str(item['_id'])

    return jsonify(fetched_data)

@app.route('/api/checkout', methods=['POST'])
def post_cart():
    
    data = request.json

    purchase_id = str(uuid.uuid4())

    cur_date = datetime.now()

    records_format = {
        "purchase_id": purchase_id,
        "items": data['items'],
        "date": cur_date.isoformat()
    }

    billing_format = {
        "purchase_id": purchase_id,
        "billing_info": data["billing_info"],
        "date": cur_date.isoformat()
    }

    try:
        billing_collection.insert_one(billing_format)
        records_collection.insert_one(records_format)
    except TypeError:
        raise ValueError("Error in purchase backend")

    return jsonify("successfully completed perchase")

@app.route('/api/model', methods=['POST'])
def post_model():
    items = request.json  # Use an existing item for demonstration
    # loaded_model.predict(items)
    flattened = aggregate_order_features(items)
    distances, indices = nn.kneighbors([flattened])
    print(distances)
    print(indices)
    flattened_orders = [item for order in orders for item in order]
    nearest_neighbors_items = [flattened_orders[i] for i in indices[0]]  # Use flattened_orders
    
    return jsonify({"message":'success', 'data':nearest_neighbors_items})


   


if __name__ == '__main__':
    app.run(debug=True, port=5000)