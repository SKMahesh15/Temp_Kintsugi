import numpy as np
from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def build_text(node):
    parts = [
        node.get("tag", ""),
        node.get("innerText", ""),
        node.get("ariaLabel", ""),
        node.get("placeholder", ""),
        node.get("id", ""),
        node.get("role", ""),
    ]
    return " ".join(p for p in parts if p).strip()

def layer3_match(prev, currJson):
    target_text = build_text(prev)
    if not target_text:
        return (None, 0.0)

    target_vector = embedding_model.encode(
        [target_text],
        normalize_embeddings=True
    )[0]

    candi = []
    candi_text = []
    
    for cur in currJson:
        cur_text = build_text(cur)
        if cur_text:
            candi.append(cur)
            candi_text.append(cur_text)

    if not candi:
        return (None, 0.0)

    candidate_vectors = embedding_model.encode(candi_text, normalize_embeddings=True)
    similarities = np.dot(candidate_vectors, target_vector)

    best_index = int(np.argmax(similarities))
    best_score = float(similarities[best_index])
    
    return (candi[best_index].get("xpath"), best_score)