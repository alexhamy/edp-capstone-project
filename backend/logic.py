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

