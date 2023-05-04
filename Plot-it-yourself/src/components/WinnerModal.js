export class WinnerModal {
  constructor(winners){
    this.winners = winners ? winners : window.gameConfig.winners
    this.component = this.getComponent()
  }

  getWinnerHTML(){
    const playerId = window.gameConfig.playerId
    const opponentId = window.gameConfig.opponentId
    const playerName = window.gameConfig.playerName
    const opponentName = window.gameConfig.opponentName
    let winnerName = '', loserName = ''
    if (this.winners[0] === playerId){
      winnerName = playerName
      loserName = opponentName
    }
    else if (this.winners[0] === opponentId){
      winnerName = opponentName
      loserName = playerName
    }

    const winHTML = `
      <p><span class="winner">Победитель: </span><b>${winnerName}</b></p>
      <p><span class="loser">Проигравший: </span><b>${loserName}</b></p>
    `
    const drawHTML = `
      <p class="winner">
        Игроки <b>${playerName}</b> и <b>${opponentName}</b> сыграли в ничью
      </p>
    `
    const loseHTML = `
      <p class="loser">
        Игроки <b>${playerName}</b> и <b>${opponentName}</b> потерпели поражение
      </p>
    `
    switch(this.winners[2]){
      case 0:
        return winHTML
      case 1:
        return drawHTML
      case 2:
        return loseHTML
      default:
        return ''
    }
  }

  open(){
    const winnerModal = document.querySelector('#winnerModal')
    if (winnerModal) winnerModal.style.display = 'block'
    const closeBtn = document.querySelector('#winnerModalCloseBtn')
    const handleClick = () => this.close()
    if (closeBtn) closeBtn.onclick = handleClick
  }

  close(){
    const winnerModal = document.querySelector('#winnerModal')
    if (winnerModal) winnerModal.style.display = 'none'
  }

  getComponent(){
    if (this.component) return this.component
    const winnerModal = document.createElement('div')
    winnerModal.id = 'winnerModal'
    winnerModal.className = 'winner-modal'
    winnerModal.innerHTML = `
      <div id="winnerModalContent" class="winner-modal-content">
        <span id="winnerModalCloseBtn" class="close-btn">x</span>
        <div id="winnerModalHeading">
          <h3 class="winner-heading">Результат игры</h3>
          ${this.getWinnerHTML()}
        </div>
      </div>
    `
    return winnerModal
  }
}
