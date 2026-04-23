import re
import os
import asyncio
import json
import subprocess
from urllib.parse import urlparse

# Import your test script
from script import run_arcane_jobs_flow

# Import the 3 Healing Layers
from middleware.layer1 import layer1_match
from middleware.layer2 import layer_2_mechanism
from middleware.layer3 import layer3_match

def load_json(filepath):
    with open(filepath, "r") as file:
        data = json.load(file)
    return data

def rewrite_and_rerun_script(script_filename, broken_line, broken_selector, healed_selector):
    """Physically modifies the script file with the new #id and reruns it."""
    # Replace the broken #id with the new #id in the exact line of code
    healed_line = broken_line.replace(broken_selector, healed_selector)
    
    print(f"\n✍️ Modifying {script_filename}...")
    print(f"   [-] Removing: {broken_selector}")
    print(f"   [+] Injecting: {healed_selector}")

    # Read, replace, and overwrite the script file
    with open(script_filename, 'r') as file:
        script_content = file.read()
        
    script_content = script_content.replace(broken_line, healed_line)
    
    with open(script_filename, 'w') as file:
        file.write(script_content)
        
    print(f"\n🔄 Rerunning {script_filename} with healed selector...")
    subprocess.run(["python", script_filename])


def get_id_from_xpath(xpath, current_dom):
    """Helper to map a returned xpath back to its CSS ID."""
    if not xpath:
        return None
    for node in current_dom:
        if node.get('xpath') == xpath:
            node_id = node.get('id')
            if node_id:
                return f"#{node_id}"
    return None


async def main():
    print("🚀 Initial Run...")
    pageUrl, exCode, frames = await run_arcane_jobs_flow()

    if exCode == 1:
        print(f"\n❌ Script Crashed! Intercepting failure on {pageUrl}")
        
        errorCodeLine = frames[0].line
        print(errorCodeLine)
        match = re.search(r'["\'](#[^"\']+)["\']', errorCodeLine)
        
        if not match:
            print("Could not parse broken selector from code. Exiting.")
            return

        broken_selector = match.group(1)
        idUs = broken_selector.replace("#", '')
        print(f"🔍 Broken ID identified: {idUs}")
        
        path = urlparse(pageUrl).path
        prevUrlName = os.path.basename(path).split(".")[0]
        
        prevJson = load_json(f"test_json/{prevUrlName}_s.json")
        currJson = load_json(f"test_json/{prevUrlName}_us.json")
        
        prevJsonDict = None
        for node in prevJson:
            if node.get('id') == idUs:
                prevJsonDict = node
                break
                
        if not prevJsonDict:
            print(f"Could not find ID '{idUs}' in the previous success DOM. Cannot heal.")
            return

        print("\n🛠️ Initiating Kintsugi Fallback Sequence...")
        healed_selector = None
        old_xpath = prevJsonDict.get('xpath')

        # ==========================================
        # LAYER 1: BRUTE FORCE (Exact matches)
        # ==========================================
        print("▶️ Executing Layer 1 (Brute Force)...")
        l1_node = layer1_match(prevJsonDict, currJson)
        if l1_node and l1_node.get('id'):
            print("✅ Layer 1 Success: Found exact match.")
            healed_selector = f"#{l1_node['id']}"

        # ==========================================
        # LAYER 2: HEURISTIC / SYNTACTIC (difflib)
        # ==========================================
        if not healed_selector:
            print("⚠️ Layer 1 Failed. Escalating to Layer 2 (Syntactic Heuristics)...")
            l2_xpath, l2_score = layer_2_mechanism(old_xpath, prevJson, currJson)
            
            # Using the result regardless of score threshold
            if l2_xpath:
                print(f"✅ Layer 2 Found Match (Score: {l2_score})")
                healed_selector = get_id_from_xpath(l2_xpath, currJson)

        # ==========================================
        # LAYER 3: SEMANTIC (Vector Embeddings)
        # ==========================================
        if not healed_selector:
            print("⚠️ Layer 2 Failed to yield a valid ID. Escalating to Layer 3 (Semantic Embeddings)...")
            l3_xpath, l3_score = layer3_match(prevJsonDict, currJson)
            
            # Using the result regardless of score threshold
            if l3_xpath:
                print(f"✅ Layer 3 Found Match (Score: {l3_score})")
                healed_selector = get_id_from_xpath(l3_xpath, currJson)

        # ==========================================
        # RESOLUTION
        # ==========================================
        if healed_selector:
            print(f"\n🎯 Target Locked! Healed Selector: {healed_selector}")
            rewrite_and_rerun_script("script.py", errorCodeLine, broken_selector, healed_selector)
        else:
            print("\n❌ All Layers Failed to find a valid #id. Escalate to Layer 4 (LLM).")

if __name__ == "__main__":
    asyncio.run(main())