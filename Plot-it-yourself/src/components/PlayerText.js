export class PlayerText {
  constructor(playerNumber){
    this.playerStr =  playerNumber === 1 ? 'player'  :
                      playerNumber === 2 ? 'opponent': ''
    this.component = this.getComponent(playerNumber)
  }

  getComponent(){
    if (this.component) return this.component

    const playerContainer = document.createElement('div')
    playerContainer.className = 'player-container'
    playerContainer.id = `${this.playerStr}Container`
    playerContainer.innerHTML = `
      <h4 id="${this.playerStr}Name" class="player-header"></h4>
      <div id="${this.playerStr}Text" class="player-text"></div>
      <div class="game-info" id="${this.playerStr}Info">
      </div>
    `
    return playerContainer
  }

}
