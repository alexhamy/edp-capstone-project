import random
import json
from generate_item import gen_item

DATA_SIZE = 5
ORDER_SIZE = 5

orders = []

for i in range(DATA_SIZE):
    order = []

    for i in range(random.randint(1, ORDER_SIZE)):
        order.append(gen_item())

    orders.append(order)

with open("fake_orders.json", "w", encoding='utf-8') as f:
    json.dump({"orders": orders}, f, indent=4)
