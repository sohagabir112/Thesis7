from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Capture console logs
    page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

    try:
        page.goto('http://localhost:5173')
        page.wait_for_timeout(2000)
        print(f"Body text length: {len(page.locator('body').inner_text())}")
    except Exception as e:
        print(f"Failed: {e}")
    finally:
        browser.close()
