/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require('express')
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

const puppeteer = require('puppeteer')

async function scrapeWebsite(userInput){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate to the website
    await page.goto('https://www.saldo-bip.com');
  
    // Input card number and click the submit button
    const cardNumber = String(userInput); // Replace with the actual card number
    await page.type('#campo_saldo', cardNumber);
    await page.click('#myButton');
  
    // Wait for the result to load
    await page.waitForSelector('.vlr');
  
    // Extract the balance from the result
    const balance = await page.$eval('.vlr', (el) => el.innerText);
  
    // Close the browser
    await browser.close();
  
    // Process the balance and send it as a JSON object
    const balanceWithoutSymbol = balance.replace('$', '').trim();
    const balanceObject = { saldo: parseFloat(balanceWithoutSymbol) };
  
    return balanceObject;
}
/*    /test
 *     This endpoint is to test the connection, if it is up it shows "test ok" */
router.post('/', async (req, res) => {
  const { userInput } = req.body
  console.log("la entrada del usuario es: ", userInput)

  try {
    const response = await scrapeWebsite(userInput)
    res.json(response)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router


// Versión deprecada scrappeando movired.cl se cambió porque no funciona la mayoría de las veces
// async function scrapeWebsite(userInput) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.setViewport({ width: 1366, height: 768 })
//     await page.setUserAgent(
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     )
  
//     // Navigate to the website
//     await page.goto('https://movired.cl')
  
//     // Click the button to open the modal
//     await page.waitForSelector('button.btn.boton-pagar.mw-150.btn-dark')
//     await page.click('button.btn.boton-pagar.mw-150.btn-dark')
  
//     // Wait for the modal to appear
//     await page.waitForSelector('#modalConsultaSaldo___BV_modal_content_', { visible: true })
  
//     // Wait for the input field to appear after clicking the button
//     const inputFieldSelector = '#modalConsultaSaldo___BV_modal_content_ input.input-movired'
//     await page.waitForSelector(inputFieldSelector, { timeout: 60000 }) // Adjust the timeout as needed
  
//     // Insert data into the input field
//     const dataInsert = String(userInput)
//     await page.type(inputFieldSelector, dataInsert)
  
//     // Now, interact with elements inside the modal
//     const buttonSelector =
//       '#modalConsultaSaldo___BV_modal_content_ button.btn.button-movired-color.boton-pagar.mw-200.btn-secondary.btn-lg.btn-block'
//     // Click the button inside the modal
//     await page.click(buttonSelector)
  
//     // Wait for the network response
//     const response = await page.waitForResponse(
//       (response) =>
//         response.url().includes('https://movired.cl/api/consulta/saldo') && response.status() === 200,
//       { timeout: 1000 }
//     )
  
//     // Read and log the response payload
//     const responseBody = await response.json()
  
//     await browser.close()
  
//     return responseBody
//   }