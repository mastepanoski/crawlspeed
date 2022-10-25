'use strict'

const puppeteer = require('puppeteer')
const cron = require('cron')

require('./models/environment')

const { createModel: createSpeedModel } = require('./models/Speed')
const dsSetup = require('./models/config')

async function main() {
    const urlToVisit = 'https://lpguatrache.com.ar/speedtest'
    const CronJob = cron.CronJob
    const speedModel = createSpeedModel(dsSetup().connection)

    const calculateSpeed = async () => {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()

        try {
            await page.goto(urlToVisit, { waitUntil: 'networkidle0' })
            await page.click('#startStopBtn')
            await new Promise(resolve => setTimeout(resolve, 60000))


            const downloadSpeedSel = await page.$('#dlText')
            const downloadSpeed = await downloadSpeedSel.evaluate(el => el.innerHTML)
            
            const uploadSpeedSel = await page.$('#ulText')
            const uploadSpeed = await uploadSpeedSel.evaluate(el => el.innerHTML)

            await speedModel.create({
                download: downloadSpeed,
                upload: uploadSpeed
            })

            console.log(`D ${downloadSpeed} / U ${uploadSpeed}`)
        } catch (err) {
            console.error('Error intentando obtener datos ' + err)
        }

        browser.close()
    }

    await calculateSpeed()

    const job = new CronJob('0 */10 * * * *', async function () {
        await calculateSpeed()
    })

    job.start()
}

main()
