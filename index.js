const PORT = 3000;
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/nike/arrivo", (req, res) => {
  (async () => {
    const url = "https://www.nike.com/it/launch?s=upcoming";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    /*   await page.screenshot({ path: "example.png" }); */

    const product = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "figure div.upcoming.upcoming-card.ncss-row.mr0-sm.ml0-sm"
        )
      ).map((upcoming) => ({
        image: upcoming.querySelector("a img").src,
        link: upcoming.querySelector("a").href,
        model: upcoming.querySelector("h3").innerText.trim(),
        available: upcoming.querySelector("h6").innerText.trim(),
      }))
    );

    console.log(product);
    res.json(product);

    await browser.close();
  })();
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
