import random
import json

material = [
    "cotton",
    "polyester",
    "wool",
    "silk",
    "linen",
    "denim",
    "leather",
    "cashmere",
    "nylon"]
season = ["Winter", "Fall", "Summer", "Spring"]

orders = []

def gen_item():

    data = {
        "name": "",
        "price": random.randint(5,100),
        "type": random.choice(material),
        "material": random.choice(material),
        "season": random.choice(season),
        "rating": round(random.random() * 5, 1)
    }

    return data

DATA_SIZE = 5
ORDER_SIZE = 5

orders = []

for i in range(DATA_SIZE):
    order = []

    for i in range(random.randint(1, ORDER_SIZE)):
        order.append(gen_item())

    orders.append(order)

with open("output.json", "w", encoding='utf-8') as f:
    json.dump({"orders": orders}, f, indent=4)
