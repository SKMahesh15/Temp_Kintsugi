# download_model.py
from sentence_transformers import SentenceTransformer

print("Downloading model to local cache...")
# This forces the download and saves it to a local folder
model = SentenceTransformer('all-MiniLM-L6-v2')
model.save('./local_minilm_model')
print("Done! You can now use offline mode.")