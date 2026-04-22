import json
import faiss
from sentence_transformers import SentenceTransformer
import re 
import numpy as np

# Note: This is tuned for my JSON file once I get the Main Stripped json version I can finetune it accordingly.


model = SentenceTransformer("all-MiniLM-L6-v2")
def embed_encode(string):
    vec = model.encode([string]).astype("float32")
    return vec

def ret_prev(error, page_url):
    match = re.search(r'"(#[^"]+)"', error['Code:'])

    if not match:
        return None
    id_to_search = match.group(1)
    page = page_url.split("/")[-1]

    index = faiss.read_index(f"{page}_successfull.index")

    query = embed_encode(f"button id {id_to_search}").reshape(1, -1)
    D, I = index.search(query, 1)
    found_idx = str(I[0][0])
    
    return found_idx