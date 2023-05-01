import { App } from "./components/App.js"
import './styles.scss'

async function getData(numberOfTask = 1) {
  const gameData = {}
  try {
    const data = await fetch(`./outputs/output${numberOfTask}.txt`)
    const textData = (await data.text()).split('\n')
    setGameData(textData, gameData)
    return gameData
  }
  catch(error) {
    console.log(error)
  }
}

function setGameData(textData, gameData){
  let index = 1
  const nextLine = () => textData[index++]

  let ids = nextLine().split(/ +/)
  gameData.playerId   = parseInt(ids[0])
  gameData.opponentId = parseInt(ids[1])

  let keys = nextLine().split(/ +/)
  gameData.playerKey   = parseInt(keys[0])
  gameData.opponentKey = parseInt(keys[1])

  gameData.playerName   = nextLine().trim()
  gameData.opponentName = nextLine().trim()

  gameData.maxSteps = parseInt(nextLine())
  let textLengths = nextLine().split(/ +/)
  gameData.sourceLength = parseInt(textLengths[0])
  gameData.targetLength = parseInt(textLengths[1])

  gameData.source = nextLine()
  gameData.target = nextLine()

  gameData.stepsCount = parseInt(nextLine())

  let step = 0
  gameData.playerSteps   = []
  gameData.opponentSteps = []
  let firstSteps = 2
  while (step <= (gameData.stepsCount + firstSteps)){
    let stepInfo = nextLine().split(/ +/)
    if (!stepInfo.length) break
    let stepText = nextLine()
    let stepData = {}
    stepData.step       = parseInt(stepInfo[1])
    stepData.typeMove   = stepInfo[2]
    stepData.moveResult = stepInfo[3]
    stepData.text       = stepText

    if (parseInt(stepInfo[0]) === 1){
      gameData.playerSteps[stepData.step] = stepData
    }
    if (parseInt(stepInfo[0]) === 2){
      gameData.opponentSteps[stepData.step] = stepData
    }
    step++
  }
}

async function start() {
  window.gameConfig = await getData(2)
  console.log(window.gameConfig)
  const app = new App()
  document.body.append(app.getComponent())
  app.start()
}
start()

