const express = require('express')
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch')
const parseGameConfig = require('./parseGameConfig.js')

const app = express()
const urlToDist = path.join(__dirname, '..', 'dist')
const urlToGithub = 'https://github.com/Craaaaancus/PlotItYourself/blob/plot-it-yourself/Plot-it-yourself/output.txt'
const urlToOutput = 'https://craaaaancus.github.io/PlotItYourself/Plot-it-yourself/output.txt'
const port = 8080
app.use(cors())

app.get('/game_config', async (req, res) => {
  try {
    const data = await fetch(urlToOutput)
    const textData = await data.text()
    const gameConfig = parseGameConfig(textData)
    res.json(gameConfig)
  }
  catch(e){
    console.log(e)
  }
})

app.use(express.static(urlToDist))
app.listen(port)
console.log(`Сервер стартовал на порту ${port}`)
