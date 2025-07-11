import random
import json

material = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Linen",
    "Denim",
    "Leather",
    "Cashmere",
    "Nylon"]
season = ["Winter", "Fall", "Summer", "Spring"]
types = [
    "T-Shirt",
    "Jeans",
    "Sweater",
    "Dress",
    "Jacket",
    "Skirt",
    "Shorts",
    "Blouse",
    "Hoodie",
    "Coat",
    "Tank top",
    "Cardigan",
    "Sweatpants",
    "Button-Up Shirt",
    "Blazer"
]
category =[
    "Formal",
    "Semi-Formal",
    "Casual"
]
size =[
    "S",
    "M",
    "L",
    "XL",
    "XS",
    "XXL",
    "3XL"
]
description = "Lorem ipsum dolor sit amet consectetur adipiscing elit. " \
"Quisque faucibus ex sapien vitae pellentesque sem placerat. " \
"In id cursus mi pretium tellus duis convallis. " \
"Tempus leo eu aenean sed diam urna tempor. " \
"Pulvinar vivamus fringilla lacus nec metus bibendum egestas. " \
"Iaculis massa nisl malesuada lacinia integer nunc posuere. " \
"Ut hendrerit semper vel class aptent taciti sociosqu. " \
"Ad litora torquent per conubia nostra inceptos himenaeos."
orders = []

def gen_items(num_items):
    items = []
    for i in range(0, num_items):
        item = {
            "id": i,
            "img_id": f"IMG_{i}",
            "Price": random.randint(5,100),
            "Type": random.choice(types),
            "Material": random.choice(material),
            "Season": random.choice(season),
            "Rating": round(random.random() * 5, 1),
            "Category":random.choice(category),
            "Description":description,
            "Size": random.choice(size)
        }
        items.append(item)

    return items
