export class StepVisualizer {
  constructor(){
    this.playerContainer = document.querySelector('#playerContainer')
    this.opponentContainer = document.querySelector('#opponentContainer')
    this.playerName = document.querySelector('#playerName')
    this.opponentName = document.querySelector('#opponentName')
    this.playerInfo = document.querySelector('#playerInfo')
    this.opponentInfo = document.querySelector('#opponentInfo')
    this.playerText = document.querySelector('#playerText')
    this.opponentText = document.querySelector('#opponentText')
  }

  setPlayersText(playerText, opponentText){
    const playerLetters = playerText.split('')
    const opponentLetters = opponentText.split('')
    
    for (let i = 0; i < playerLetters.length; i++){
      let letter = playerLetters[i]
      let letterHTML = `<div class="text-letter">${letter}</div>`
      this.playerText.insertAdjacentHTML('beforeend', letterHTML);
    }
    for (let i = 0; i < opponentLetters.length; i++){
      let letter = opponentLetters[i]
      let letterHTML = `<div class="text-letter">${letter}</div>`
      this.opponentText.insertAdjacentHTML('beforeend', letterHTML);
    }
  }

  setPlayersName(playerName, opponentName){
    this.playerName.textContent = playerName
    this.opponentName.textContent = opponentName
  }


}
