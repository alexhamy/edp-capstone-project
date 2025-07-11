import random
import json
from generate_item import gen_items

DATA_SIZE = 5
ORDER_SIZE = 5


orders = []

for _ in range(DATA_SIZE):
    order = gen_items(random.randint(1, ORDER_SIZE))
    orders.append(order)

with open("fake_orders.json", "w", encoding='utf-8') as f:
    json.dump({"orders": orders}, f, indent=4)
