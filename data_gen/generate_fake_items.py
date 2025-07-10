import random
import json
from generate_item import gen_items

DATA_SIZE = 5
ORDER_SIZE = 5

items = gen_items(1000)



with open("fake_items.json", "w", encoding='utf-8') as f:
    json.dump({"items": items}, f, indent=4)
