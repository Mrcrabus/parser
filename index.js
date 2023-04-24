const axios = require('axios');
const puppeteer = require('puppeteer');

// const link = 'https://www.kufar.by/l'

class Parser {
  _link = 'https://www.kufar.by/l'
  // _link = 'https://www.youtube.com/@Illya.Landar/videos'; 

  async getArticles() {

    console.log(this._link)

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    })

    const page = await browser.newPage();
    await page.goto(this._link, {
      waitUntil: 'load'
    });


    let arr = await page.evaluate(() => {

      let text = Array.from(document.querySelector('[class^=styles_cards]').getElementsByTagName("section"), el => {
        console.log(new Date(Date.now()));
        return {
          img: el.querySelector('[class^=styles_image]').querySelector("img")?.dataset.src,
          price: el.querySelector("[class^=styles_price]").querySelector("span").innerText,
          title: el.querySelector("h3").innerText,
          area: el.querySelector("[class^=styles_secondary]").querySelector("p").textContent,
          createdDate: el.querySelector("[class^=styles_secondary]").querySelector("span").textContent,
        }

        //  el.querySelector(".styles_container__dR7XZ").querySelector("img").getAttribute("src")
      })
      return text
    })

    console.log(arr)

    await browser.close()
  }
}

const parser = new Parser();
parser.getArticles()