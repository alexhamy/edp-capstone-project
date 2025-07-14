import json
import pandas as pd

# Load orders from fake_orders_grouped.json
with open("fake_orders_grouped.json", "r", encoding='utf-8') as f:
    data = json.load(f)
    orders = data['orders']

# Flatten the orders into a list of items
items = [item for order in orders for item in order]

# Create a DataFrame from the items
df = pd.DataFrame(items)

# Analyze the data using Pandas
order_size_distribution = pd.Series([len(order) for order in orders]).value_counts().sort_index()
type_distribution = df['Type'].value_counts()
season_distribution = df['Season'].value_counts()
material_distribution = df['Material'].value_counts()
category_distribution = df['Category'].value_counts()

# Print analysis results
print("Order Size Distribution:")
print(order_size_distribution)

print("\nItem Type Distribution:")
print(type_distribution)

print("\nItem Season Distribution:")
print(season_distribution)

print("\nItem Material Distribution:")
print(material_distribution)

print("\nItem Category Distribution:")
print(category_distribution)
