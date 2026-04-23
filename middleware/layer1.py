import json

def load_json(filepath):
    with open(filepath, "r") as file:
        data = json.load(file)
    return data

def layer1_match(prev, currJson):
    for curr in currJson:

        # direct id match
        if prev['id'] == curr['id']:
            return curr

        # text + tag
        
        if (
            prev['innerText'].strip().lower() ==
            curr['innerText'].strip().lower()
            and prev['tag'] == curr['tag']
        ):
            return curr
    
    return None




