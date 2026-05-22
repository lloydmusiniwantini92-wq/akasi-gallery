import { chromium } from 'playwright';

(async () => {
  console.log("🚀 Starting Playwright End-to-End Checkout Test...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Listen for console logs in page
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  try {
    // 1. Load Homepage
    console.log("1. Navigating to http://localhost:3005...");
    await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
    
    // Wait for the splash screen to fade (2.2 seconds in App.tsx)
    console.log("Waiting for splash screen to clear...");
    await page.waitForTimeout(3000);

    // 2. Navigate to Shop
    console.log("2. Clicking 'The Viewing Room' to open catalog...");
    const viewingRoomBtn = page.locator('button:has-text("The Viewing Room")').first();
    await viewingRoomBtn.click();
    await page.waitForSelector('h1:has-text("The Repository.")');
    console.log("Catalog page loaded successfully.");

    // 3. Select Product & Open Checkout
    console.log("3. Locating product card...");
    const productCard = page.locator('.grid .group').first();
    await productCard.scrollIntoViewIfNeeded();
    
    console.log("Hovering over product card...");
    await productCard.hover();
    await page.waitForTimeout(1000);
    
    console.log("Clicking the Acquire button...");
    const acquireBtn = page.locator('button:has-text("Acquire Masterpiece")').first();
    await acquireBtn.click({ force: true });
    
    // 4. Verify Checkout Modal & Variant Selection
    console.log("4. Verifying checkout modal...");
    await page.waitForSelector('h3:has-text("Request Acquisition.")');
    
    const priceEl = page.locator('p:has-text("Acquisition Price") + p');
    const initialPrice = await priceEl.innerText();
    console.log("Initial product price:", initialPrice);

    // Change variant/size selection if picker exists
    const variantSelect = page.locator('select');
    if (await variantSelect.count() > 0) {
      console.log("Selecting second size/variant option...");
      await variantSelect.selectOption({ index: 1 });
      await page.waitForTimeout(500); // Wait for price to transition
      const updatedPrice = await priceEl.innerText();
      console.log("Updated product price after size change:", updatedPrice);
      if (initialPrice === updatedPrice) {
        throw new Error("Variant price did not update dynamically!");
      }
    }

    // 5. Fill out Collector Credentials (Shipping details)
    console.log("5. Filling out shipping credentials...");
    await page.fill('input[placeholder="John Doe"]', 'John Playwright');
    await page.fill('input[placeholder="collector@archive.com"]', 'playwright@test.com');
    await page.fill('input[placeholder="+1 555-555-5555"]', '1234567890');
    await page.fill('input[placeholder="123 Gallery Lane"]', '100 Test St');
    await page.fill('input[placeholder="New York"]', 'Test City');
    await page.fill('input[placeholder="NY"]', 'TS');
    await page.fill('input[placeholder="10001"]', '99999');
    await page.fill('input[placeholder="US"]', 'US');

    // 6. Submit Order
    console.log("6. Submitting order...");
    const submitBtn = page.locator('button:has-text("Proceed to Securing Work")');
    if (await submitBtn.isDisabled()) {
      throw new Error("Submit button remains disabled! Form field validation issue.");
    }
    
    await submitBtn.click();
    console.log("Order submitted. Waiting for bridge server response...");

    // 7. Verify Success Step
    await page.waitForSelector('h3:has-text("Acquisition Initiated.")', { timeout: 10000 });
    console.log("🎉 SUCCESS: Checkout flow completed! Order successfully submitted and processed.");

    await browser.close();
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    await page.screenshot({ path: 'checkout-failure.png' });
    console.log("Failure screenshot saved as checkout-failure.png");
    await browser.close();
    process.exit(1);
  }
})();
