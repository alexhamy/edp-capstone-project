import random
import json
from generate_item import gen_items
import uuid
from faker import Faker

fake = Faker()

DATA_SIZE = 5
ORDER_SIZE = 5

orders = []

for i in range(DATA_SIZE):
    purchase_id = str(uuid.uuid4())
        
    items = (gen_items(random.randint(0, ORDER_SIZE)))

    data = {
        "purchase_id": purchase_id,
        "items": items,
        "billing_info":
            {"address": fake.address(),
             "payment": ''.join(random.choices('0123456789', k=16))}
        }

    orders.append(data)

with open("fake_orders.json", "w", encoding='utf-8') as f:
    json.dump({"orders": orders}, f, indent=4)
