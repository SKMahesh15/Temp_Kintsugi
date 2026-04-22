from script import run_arcane_jobs_flow
import traceback
import sys
from urllib.parse import urlparse
import difflib
import asyncio
import re
import os
import json

def load_json(filepath):
    with open(filepath, "r") as file:
        data = json.load(file)
    return data

pageUrl, exCode, frames = asyncio.run(run_arcane_jobs_flow())

if exCode == 1:
    errorCodeLine = frames[0].line

    match = re.search(r'["\'](#[^"\']+)["\']', errorCodeLine)
    path = urlparse(pageUrl).path
    prevName = os.path.basename(path).split(".")[0]
    idUs = match.group(1) if match else None
    
    # Takes previous HTML element from json
    prevJson = load_json(f"test_json/{prevName}_s.json")
    print(prevJson['layer_1_identity'])


    currJson = load_json(f"test_json/{prevName}_us.json")
    print(currJson['layer_1_identity'])


