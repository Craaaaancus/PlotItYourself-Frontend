import { StepVisualizer } from "./StepVisualizer.js";

export class StepController {
  constructor() {
    this.renderer = new StepVisualizer()
  }

  setPlayer(playerNum) {
    if (playerNum === 1) {
      this.playerText = document.querySelector('#playerText');
      this.playerName = document.querySelector('#playerName');
      this.playerName.textContent = window.gameConfig.playerName;
      this.playerInfo = document.querySelector('#playerInfo');
      this.playerInfo.innerHTML = `
        Игрок 
        <b>
          ${window.gameConfig.playerName}
          <span class="message" data-color="red">asdfasdfasdfasdfas</span>
        </b> 
      `;
    }
    if (playerNum === 2) {
      this.playerText = document.querySelector('#opponentText');
      this.playerName = document.querySelector('#opponentName');
      this.playerName.textContent = window.gameConfig.opponentName;
      this.playerInfo = document.querySelector('#opponentInfo');
      this.playerInfo.innerHTML = `
        Оппонент 
        <b>
          ${window.gameConfig.opponentName}
          <span class="message"></span>
        </b> 
      `;
    }

  }

  setStep(playerNum, step) {
    this.setPlayer(playerNum);
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    switch (stepData.typeMove) {
      case 'N':
        this.startStep(playerNum)
        break
      case 'L':
        this.lengthStep(playerNum, step);
        break;
      case 'G':
        this.getCharStep(playerNum, step);
        break;
      case 'S':
        this.setCharStep(playerNum, step);
        break;
      case 'D':
        this.deleteCharsStep(playerNum, step);
        break;
      case 'F':
        this.findStrStep(playerNum, step);
        break;
      case 'I':
        this.insCharStep(playerNum, step);
        break;
    }
  }

  getStepData(playerNum, step) {
    if (playerNum === 1) {
      return window.gameConfig.playerSteps[step];
    }
    if (playerNum === 2) {
      return window.gameConfig.opponentSteps[step];
    }
  }

  setPlayerText(playerNum, step){
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const letters = stepData.text.split('')
    this.playerText.innerHTML = ''
    for (let i = 0; i < letters.length; i++) {
      const letterHTML = `
        <div class="text-letter">${letters[i]}</div>
      `;
      this.playerText.insertAdjacentHTML('beforeend', letterHTML);
    }
  }

  startStep(playerNum) {
    const initStepMessage = 'начал задачу';
    let initStep = 0
    this.setPlayer(playerNum);
    this.setPlayerText(playerNum, initStep)

    this.playerText.dataset.color = ''
    let message = this.playerInfo.querySelector('.message');
    message.textContent = initStepMessage;
    message.dataset.color = 'orange'
  }

  lengthStep(playerNum, step) {
    this.setPlayer(playerNum);
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return;
    this.setPlayerText(playerNum, step)
    const lengthStepMessage = `
      получил длину текста в ${stepData.text.length} символов
    `;
    this.playerText.dataset.color = 'orange'
    let message = this.playerInfo.querySelector('.message');
    message.textContent = lengthStepMessage;
    message.dataset.color = 'orange'
  }

  getCharStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    this.setPlayerText(playerNum, step)

    this.playerText.dataset.color = ''
    const getCharStepMessage = `
      получил символ с индексом
    `
    let message = this.playerInfo.querySelector('.message');
    message.textContent = getCharStepMessage;
    message.dataset.color = 'blue'
  }

  setCharStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    this.setPlayerText(playerNum, step)
    
    this.playerText.dataset.color = ''
    const setCharStepMessage = `
      установил символ на позиции
    `
    let message = this.playerInfo.querySelector('.message');
    message.textContent = setCharStepMessage;
    message.dataset.color = 'green'
  }

  deleteCharsStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    this.setPlayerText(playerNum, step)
    
    this.playerText.dataset.color = ''
    const deleteCharsStepMessage = `
      удалил символов в диапазоне от до
    `
    let message = this.playerInfo.querySelector('.message');
    message.textContent = deleteCharsStepMessage;
    message.dataset.color = 'red'
  }

  findStrStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    this.setPlayerText(playerNum, step)
    
    this.playerText.dataset.color = ''
    const findStrStepMessage = `
      обнаружил строку на позиции
    `
    let message = this.playerInfo.querySelector('.message');
    message.textContent = findStrStepMessage;
    message.dataset.color = 'blue'
  }

  insCharStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step);
    if (!stepData) return
    this.setPlayerText(playerNum, step)
    
    this.playerText.dataset.color = ''
    const setCharStepMessage = `
      вставил символ на позиции
    `
    let message = this.playerInfo.querySelector('.message');
    message.textContent = setCharStepMessage;
    message.dataset.color = 'green'
  }

  outOfBoundsStep(playerNum, step){

  }

  notFoundStep(playerNum, step){

  }
}
