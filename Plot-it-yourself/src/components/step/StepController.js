import { StepVisualizer } from './StepVisualizer.js'

export class StepController {
  constructor() {
    this.renderer = new StepVisualizer()
  }

  setStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    switch (stepData.typeMove) {
      case 'N':
        this.startStep(playerNum, step)
        break
      case 'L':
        this.lengthStep(playerNum, step)
        break
      case 'G':
        if (stepData.moveResult === 'O') {
          this.outOfBoundsStep(playerNum, step)
        } else this.getCharStep(playerNum, step)
        break
      case 'S':
        if (stepData.moveResult === 'O') {
          this.outOfBoundsStep(playerNum, step)
        } else this.setCharStep(playerNum, step)
        break
      case 'D':
        if (stepData.moveResult === 'O') {
          this.outOfBoundsStep(playerNum, step)
        } else this.deleteCharsStep(playerNum, step)
        break
      case 'F':
        if (stepData.moveResult === 'F') {
          this.notFoundStep(playerNum, step)
        } else this.findStrStep(playerNum, step)
        break
      case 'I':
        if (stepData.moveResult === 'O') {
          this.outOfBoundsStep(playerNum, step)
        } else this.insCharStep(playerNum, step)
        break
    }
  }

  getStepData(playerNum, step) {
    if (playerNum === 1) {
      return window.gameConfig.playerSteps[step]
    }
    if (playerNum === 2) {
      return window.gameConfig.opponentSteps[step]
    }
  }

  startStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const initStepMessage = 'начал задачу'
    const color = 'orange'
    this.renderer.setPlayerText(playerNum, stepData.text)
    this.renderer.setPlayerStepInfo(playerNum, step, initStepMessage, color)
    this.renderer.highlightPlayerText(playerNum)
  }

  lengthStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const lengthStepMessage = `
      получил длину текста в ${stepData.text.length} символов
    `
    const color = 'orange'
    this.renderer.setPlayerText(playerNum, stepData.text)
    this.renderer.setPlayerStepInfo(playerNum, step, lengthStepMessage, color)
    this.renderer.highlightPlayerText(playerNum, color)
  }

  getCharStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const position = stepData.position
    const getCharStepMessage = `
      получил символ '${text[position]}' на позиции ${position}
    `
    const color = 'blue'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(playerNum, step, getCharStepMessage, color)
    this.renderer.highlightPlayerText(playerNum)
    this.renderer.highlightPlayerLetters(playerNum, color, position)
  }

  setCharStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const position = stepData.position
    const setCharStepMessage = `
      установил символ '${text[position]}' на позицию ${position}
    `
    const color = 'green'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(playerNum, step, setCharStepMessage, color)
    this.renderer.highlightPlayerText(playerNum)
    this.renderer.highlightPlayerLetters(playerNum, color, position)
  }

  deleteCharsStep(playerNum, step) {
    const stepDataPrev = this.getStepData(playerNum, step - 1)
    const stepData = this.getStepData(playerNum, step)
    if (!stepDataPrev || !stepData) return
    const text = stepDataPrev.text
    const position = stepData.position
    const count = text.length - stepData.text.length
    const deleteCharsStepMessage = `
      удалил ${count} символов на позиции ${position}
    `
    const color = 'red'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(
      playerNum,
      step,
      deleteCharsStepMessage,
      color
    )
    this.renderer.highlightPlayerText(playerNum)
    this.renderer.highlightPlayerLetters(playerNum, color, position, count)
  }

  findStrStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const position = stepData.position
    const findStrStepMessage = `
      обнаружил искомую строку на позиции ${position}
    `
    const color = 'blue'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(playerNum, step, findStrStepMessage, color)
    this.renderer.highlightPlayerText(playerNum)
    this.renderer.highlightPlayerLetters(playerNum, color, position)
  }

  insCharStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const position = stepData.position
    const insCharStepMessage = `
      вставил символ '${text[position]}' на позицию ${position}
    `
    const color = 'green'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(playerNum, step, insCharStepMessage, color)
    this.renderer.highlightPlayerText(playerNum)
    this.renderer.highlightPlayerLetters(playerNum, color, position)
  }

  outOfBoundsStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const outOfBoundsStepMessage = `
      вышел за пределы строки
    `
    const color = 'red'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(
      playerNum,
      step,
      outOfBoundsStepMessage,
      color
    )
    this.renderer.highlightPlayerText(playerNum, color)
  }

  notFoundStep(playerNum, step) {
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const text = stepData.text
    const notFoundStepMessage = `
      не нашел искомый элемент
    `
    const color = 'red'
    this.renderer.setPlayerText(playerNum, text)
    this.renderer.setPlayerStepInfo(playerNum, step, notFoundStepMessage, color)
    this.renderer.highlightPlayerText(playerNum, color)
  }
}
