from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import numpy as np
import pandas as pd
import json

# Load orders from fake_orders.json
with open("fake_orders_grouped.json", "r", encoding='utf-8') as f:
    data = json.load(f)
    orders = [item for sublist in data['orders'] for item in sublist]  # Flatten the list of lists

# Extract all unique categories for each feature
materials = list(set(order['Material'] for order in orders))
seasons = list(set(order['Season'] for order in orders))
types = list(set(order['Type'] for order in orders))
categories = list(set(order['Category'] for order in orders))

# Convert categorical data to numerical format
encoder = OneHotEncoder(categories=[materials, seasons, types, categories], handle_unknown='ignore')
material_encoded = encoder.fit_transform([[order['Material'], order['Season'], order['Type'], order['Category']] for order in orders]).toarray()

# Normalize numerical data
scaler = StandardScaler()
price_normalized = scaler.fit_transform([[order['Price']] for order in orders])
rating_normalized = scaler.fit_transform([[order['Rating']] for order in orders])
id_normalized = scaler.fit_transform([[order['id']] for order in orders])

# Create feature vectors
features = np.hstack((material_encoded, price_normalized, rating_normalized, id_normalized))

# Fit Nearest Neighbors model
nn = NearestNeighbors(n_neighbors=5)
nn.fit(features)

# Find nearest neighbors for a new item (using a sample item from the orders for demonstration)
new_item = orders[0]  # Use an existing item for demonstration
print("Example item:")
print(new_item)

new_item_features = np.hstack((
    encoder.transform([[new_item['Material'], new_item['Season'], new_item['Type'], new_item['Category']]]).toarray(),
    scaler.transform([[new_item['Price']]]),
    scaler.transform([[new_item['Rating']]]),
    scaler.transform([[new_item['id']]])
))

distances, indices = nn.kneighbors(new_item_features)

# Output the nearest neighbors
print("\nNearest neighbors:")
nearest_neighbors = [orders[i] for i in indices[0]]
for neighbor in nearest_neighbors:
    print(neighbor)
