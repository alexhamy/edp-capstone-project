import random
import json
from generate_item import gen_items

# Constants for the number of orders and maximum order size
NUM_ORDERS = 1000
MAX_ORDER_SIZE = 5

# Generate items
items = gen_items(1000)

# Group items by type, season, material, and category
items_by_type = {}
items_by_season = {}
items_by_material = {}
items_by_category = {}

for item in items:
    if item['Type'] not in items_by_type:
        items_by_type[item['Type']] = []
    items_by_type[item['Type']].append(item)
    
    if item['Season'] not in items_by_season:
        items_by_season[item['Season']] = []
    items_by_season[item['Season']].append(item)
    
    if item['Material'] not in items_by_material:
        items_by_material[item['Material']] = []
    items_by_material[item['Material']].append(item)
    
    if item['Category'] not in items_by_category:
        items_by_category[item['Category']] = []
    items_by_category[item['Category']].append(item)

# Generate orders with patterns or without any grouping
orders = []

for _ in range(NUM_ORDERS):
    # Decide whether to group or not
    if random.choice([True, False]):
        # Randomly choose a grouping attribute
        grouping_choice = random.choice(['type', 'season', 'material', 'category'])
        
        if grouping_choice == 'type':
            chosen_type = random.choice(list(items_by_type.keys()))
            order_size = random.randint(1, MAX_ORDER_SIZE)
            order_items = random.sample(items_by_type[chosen_type], min(order_size, len(items_by_type[chosen_type])))
        elif grouping_choice == 'season':
            chosen_season = random.choice(list(items_by_season.keys()))
            order_size = random.randint(1, MAX_ORDER_SIZE)
            order_items = random.sample(items_by_season[chosen_season], min(order_size, len(items_by_season[chosen_season])))
        elif grouping_choice == 'material':
            chosen_material = random.choice(list(items_by_material.keys()))
            order_size = random.randint(1, MAX_ORDER_SIZE)
            order_items = random.sample(items_by_material[chosen_material], min(order_size, len(items_by_material[chosen_material])))
        elif grouping_choice == 'category':
            chosen_category = random.choice(list(items_by_category.keys()))
            order_size = random.randint(1, MAX_ORDER_SIZE)
            order_items = random.sample(items_by_category[chosen_category], min(order_size, len(items_by_category[chosen_category])))
    else:
        # No grouping, select random items
        order_size = random.randint(1, MAX_ORDER_SIZE)
        order_items = random.sample(items, order_size)
    
    orders.append(order_items)

# Save orders to a JSON file
with open("fake_orders_grouped.json", "w", encoding='utf-8') as f:
    json.dump({"orders": orders}, f, indent=4)

print("Generated 1000 orders with and without patterns.")
