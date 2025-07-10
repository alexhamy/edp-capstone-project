import random
import json
from generate_item import gen_item

DATA_SIZE = 5
ORDER_SIZE = 5

orders = []

for i in range(DATA_SIZE):
    orders.append(gen_item())

with open("fake_items.json", "w", encoding='utf-8') as f:
    json.dump({"items": orders}, f, indent=4)
