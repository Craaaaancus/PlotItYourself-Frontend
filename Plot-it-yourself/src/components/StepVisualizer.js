export class StepVisualizer {
  constructor() {
    this.playerContainer = document.querySelector('#playerContainer');
    this.opponentContainer = document.querySelector('#opponentContainer');
    this.playerName = document.querySelector('#playerName');
    this.opponentName = document.querySelector('#opponentName');
    this.playerInfo = document.querySelector('#playerInfo');
    this.opponentInfo = document.querySelector('#opponentInfo');
    this.playerText = document.querySelector('#playerText');
    this.opponentText = document.querySelector('#opponentText');
  }

  setPlayerText(playerNum, text) {
    if (playerNum === 1) {
      const playerLetters = text.split('');
      this.playerText.innerHTML = '';
      for (let i = 0; i < playerLetters.length; i++) {
        let letter = playerLetters[i];
        let letterHTML = `<div class="text-letter">${letter}</div>`;
        this.playerText.insertAdjacentHTML('beforeend', letterHTML);
      }
    }
    if (playerNum === 2) {
      const opponentLetters = text.split('');
      this.opponentText.innerHTML = '';
      for (let i = 0; i < opponentLetters.length; i++) {
        let letter = opponentLetters[i];
        let letterHTML = `<div class="text-letter">${letter}</div>`;
        this.opponentText.insertAdjacentHTML('beforeend', letterHTML);
      }
    }
  }

  setPlayerNames(playerName, opponentName) {
    this.playerName.textContent = playerName;
    this.playerName = playerName;
    this.opponentName.textContent = opponentName;
    this.opponentName = opponentName;
  }

  setPlayerStepInfo(playerNum, step = 0, message = '', color = '') {
    if (playerNum === 1){
      this.playerInfo.innerHTML = `
        <b>Ход ${step}:</b> игрок 
        <b>
          ${this.playerName.textContent}
          <span class="message" data-color="${color}">${message}</span>
        </b>
      `
    }
    if (playerNum === 2){
      this.opponentInfo.innerHTML = `
        <b>Ход ${step}:</b> оппонент 
        <b>
          ${this.opponentName.textContent}
          <span class="message" data-color="${color}">${message}</span>
        </b>
      `
    }
  }

  highlightPlayerText(playerNum, color = ''){
    if (playerNum === 1){
      this.playerText.dataset.color = color
    }
    if (playerNum === 2){
      this.opponentText.dataset.color = color
    }
  }

  highlightPlayerLetters(playerNum, color, position, count = 1){
    let currentPos = position
    for (let i = 0; i < count; i++){
      const selector = `.text-letter:nth-child(${currentPos + 1})`
      let letter
      if (playerNum === 1) letter = this.playerText.querySelector(selector)
      if (playerNum === 2) letter = this.opponentText.querySelector(selector)
      if (letter) letter.dataset.color = color
      currentPos++
    }
  }
}
