export class StepController {
  constructor() {
    
  }

  setPlayer(playerNum){
    if (playerNum === 1) {
      this.playerText = document.querySelector('#playerText');
      this.playerName = document.querySelector('#playerName');
      this.playerName.textContent = window.gameConfig.playerName;
      this.playerInfo = document.querySelector('#playerInfo')
      this.playerInfo.innerHTML = `
        Игрок 
        <b>
          ${window.gameConfig.playerName}
          <span class="message"></span>
        </b> 
      `
    }
    if (playerNum === 2) {
      this.playerText = document.querySelector('#opponentText');
      this.playerName = document.querySelector('#opponentName');
      this.playerName.textContent = window.gameConfig.opponentName;
      this.playerInfo = document.querySelector('#opponentInfo')
      this.playerInfo.innerHTML = `
        Игрок 
        <b>
          ${window.gameConfig.opponentName}
          <span class="message"></span>
        </b> 
      `
    }
    this.playerText.className = 'player-text'
  }

  setStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step)
    switch(stepData.typeMove){
      case 'L':
        this.lengthStep(playerNum, step)
        break
      case 'G':
        this.getCharStep(playerNum, step)
        break
      case 'S':
        this.setCharStep(playerNum, step)
        break
      case 'D':
        this.deleteCharsStep(playerNum, step)
        break
      case 'F':
        this.FindStrStep(playerNum, step)
        break
      case 'I':
        this.InsCharStep(playerNum, step)
        break
    }
  }

  getStepData(playerNum, step){
    if (playerNum === 1){
      return window.gameConfig.playerSteps[step]
    }
    if (playerNum === 2){
      return window.gameConfig.opponentSteps[step]
    }
  }

  initTextStep(playerNum) {
    const initStepMessage = 'начал задачу'
    let letters = window.gameConfig?.source.split('');
    this.setPlayer(playerNum)

    for (let i = 0; i < letters.length; i++) {
      const letterHTML = `
        <div class="text-letter">${letters[i]}</div>
      `;
      this.playerText.insertAdjacentHTML('beforeend', letterHTML);
    }

    let message = this.playerInfo.querySelector('.message')
    message.textContent = initStepMessage
    message.classList.add('orange')
  }

  lengthStep(playerNum, step){
    this.setPlayer(playerNum)
    const stepData = this.getStepData(playerNum, step)
    if (!stepData) return
    const lengthStepMessage = `
      получил длину текста в ${stepData.text.length} символов
    `
    this.playerText.classList.add('orange')
    let message = this.playerInfo.querySelector('.message')
    message.textContent = lengthStepMessage
    message.classList.add('orange')
  }


}
