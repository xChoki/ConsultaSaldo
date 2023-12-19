import puppeteer from 'puppeteer'

export default async function scrapeWebsite(input: string): Promise<any> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Navigate to the website
  await page.goto('https://movired.cl')

  // Click the button to open the modal
  await page.waitForSelector('button.btn.boton-pagar.mw-150.btn-dark')
  await page.click('button.btn.boton-pagar.mw-150.btn-dark')

  // Wait for the modal to appear
  await page.waitForSelector('#modalConsultaSaldo___BV_modal_content_', { visible: true })

  // Now, interact with elements inside the modal
  const inputSelector = '#modalConsultaSaldo___BV_modal_content_ input.input-movired'
  const buttonSelector =
    '#modalConsultaSaldo___BV_modal_content_ button.btn.button-movired-color.boton-pagar.mw-200.btn-secondary.btn-lg.btn-block'


  // Click the button inside the modal
  await page.click(buttonSelector)
  console.log('Button inside the modal clicked')

  // Wait for the input field to appear after clicking the button
  const inputFieldSelector = '#modalConsultaSaldo___BV_modal_content_ input.input-movired'
  await page.waitForSelector(inputFieldSelector, { timeout: 60000 }) // Adjust the timeout as needed

  // Insert data into the input field
  const dataInsert = String(input)
  await page.type(inputSelector, dataInsert)
  console.log('Data inserted into the input field')

  // Wait for the network response
  const response = await page.waitForResponse((response) =>
    response.url().includes('https://movired.cl/api/consulta/saldo')
  ) // Replace 'your-api-endpoint' with the actual API endpoint

  // Read and log the response payload
  const responseBody = await response.json()
  console.log('Response:', responseBody)

  await browser.close()

  return responseBody
}
