const express = require('express')
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
const urlToDist = path.join(__dirname, '..', 'dist')
const urlToGithub = 'https://github.com/Craaaaancus/PlotItYourself/blob/plot-it-yourself/Plot-it-yourself/output.txt'
const urlToOutput = 'https://craaaaancus.github.io/PlotItYourself/Plot-it-yourself/output.txt'
const port = 8080
app.use(cors())

function getGameConfig(dataLines){
  const gameData = {}
  let index = 1 // игнорируем *#*#*#*#
  const nextLine = () => dataLines[index++]

  let winners = nextLine().split(/ +/)
  gameData.winners = []
  gameData.winners[0] = parseInt(winners[0])
  gameData.winners[1] = parseInt(winners[1])
  gameData.winners[2] = parseInt(winners[2])

  let ids = nextLine().split(/ +/)
  gameData.playerId = parseInt(ids[0])
  gameData.opponentId = parseInt(ids[1])

  let keys = nextLine().split(/ +/)
  gameData.playerKey = parseInt(keys[0])
  gameData.opponentKey = parseInt(keys[1])

  gameData.playerName = nextLine().trim()
  gameData.opponentName = nextLine().trim()

  gameData.maxSteps = parseInt(nextLine())
  let textLengths = nextLine().split(/ +/)
  gameData.sourceLength = parseInt(textLengths[0])
  gameData.targetLength = parseInt(textLengths[1])
  gameData.numberOfTask = parseInt(nextLine())
  gameData.source = nextLine()
  gameData.target = nextLine()

  gameData.stepsCount = parseInt(nextLine())

  let step = 0
  gameData.playerSteps = []
  gameData.opponentSteps = []
  let firstSteps = 2
  while (step <= gameData.stepsCount + firstSteps) {
    let next = nextLine()
    if (!next) break
    let stepInfo = next.split(/ +/)
    if (!stepInfo.length) break
    let stepText = nextLine()
    let stepData = {}
    stepData.step = parseInt(stepInfo[1])
    stepData.typeMove = stepInfo[2]
    stepData.moveResult = stepInfo[3]
    stepData.position = parseInt(stepInfo[4])
    stepData.text = stepText

    if (parseInt(stepInfo[0]) === 1) {
      gameData.playerSteps[stepData.step] = stepData
    }
    if (parseInt(stepInfo[0]) === 2) {
      gameData.opponentSteps[stepData.step] = stepData
    }
    step++
  }

  return gameData
}

app.get('/game_config', async (req, res) => {
  try {
    const data = await fetch(urlToOutput)
    const dataText = await data.text()
    const textLines = dataText.split('\n')
    const gameConfig = getGameConfig(textLines)
    res.json(gameConfig)
  }
  catch(e){
    console.log(e)
  }
})

app.use(express.static(urlToDist))
app.listen(port)
console.log(`Сервер стартовал на порту ${port}`)
