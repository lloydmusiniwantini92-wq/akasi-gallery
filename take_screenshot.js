import { chromium } from 'playwright';

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to standard desktop resolution
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:3005/#about...');
  await page.goto('http://localhost:3005/#about');
  
  console.log('Waiting for splash screen to complete...');
  await page.waitForTimeout(3000);
  
  console.log('Scrolling down to trigger whileInView animations...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 150;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 30);
    });
  });

  // Wait a short moment for final transitions to finish
  await page.waitForTimeout(1000);
  
  console.log('Capturing screenshot...');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  console.log('Screenshot captured successfully as screenshot.png');
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshot:', err);
  process.exit(1);
});
