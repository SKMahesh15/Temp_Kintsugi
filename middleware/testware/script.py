import asyncio
import os
import sys
from playwright.async_api import async_playwright
import traceback

async def run_arcane_jobs_flow():
    start_url = f"http://127.0.0.1:5500/middleware/testware/test_web/test.html"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, slow_mo=500)
        page = await browser.new_page()
        page.set_default_timeout(3000)
        exCode = 0
        frames = None
        try: 
            print("🚀 Step 1: Loading Job Board...")
            await page.goto(start_url)
            
            # Target 1: Click the Nexus AI Senior ML Engineer role
            await page.wait_for_selector("#job-card-1")
            await page.click("#job-card-1")

            print("➡️ Step 2: Filling Application Form...")
            # Target 2: Fill out basic info
            await page.wait_for_selector("#first-name")
            await page.fill("#first-name", "Arjun")
            await page.fill("#last-name", "Sharma")
            await page.fill("#email-input", "arjun@example.com")
            
            # Target 3: Submit the application
            await page.click("#submit-application")

            print("➡️ Step 3: Verifying Submission...")
            # Target 4: Extract the success reference code
            await page.wait_for_selector(".ref-code")
            ref_code = await page.inner_text(".ref-code")
            
            print(f"\n✅ Success! Application submitted with Reference: {ref_code}")
            return page.url, exCode, frames

        except Exception as e:
            exCode = 1
            frames = traceback.extract_tb(e.__traceback__)
            return page.url, exCode, frames
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_arcane_jobs_flow())