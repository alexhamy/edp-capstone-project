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
types = [
    "t-shirt",
    "jeans",
    "sweater",
    "dress",
    "jacket",
    "skirt",
    "shorts",
    "blouse",
    "hoodie",
    "coat",
    "tank top",
    "cardigan",
    "sweatpants",
    "button-up shirt",
    "blazer"
]
orders = []

def gen_item():

    data = {
        "name": "",
        "price": random.randint(5,100),
        "type": random.choice(types),
        "material": random.choice(material),
        "season": random.choice(season),
        "rating": round(random.random() * 5, 1)
    }

    return data
