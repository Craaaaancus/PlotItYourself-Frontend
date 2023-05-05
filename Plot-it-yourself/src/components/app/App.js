import { ButtonsContainer, ButtonHandler } from '../buttons'
import { PlayerText } from '../player-text/PlayerText.js'
import { StepVisualizer } from '../step'
import { WinnerModal } from '../winner-modal/WinnerModal.js'
import { TaskInfo } from '../task-info/TaskInfo.js'

export class App {
  constructor() {
    this.buttonsContainer = new ButtonsContainer()
    this.player = 1
    this.opponent = 2
    this.playerTextBlock = new PlayerText(this.player)
    this.opponentTextBlock = new PlayerText(this.opponent)
    this.taskInfo = new TaskInfo()
    this.winnerModal = new WinnerModal()
    this.component = this.getComponent()
  }

  start() {
    document.body.append(this.component)
    const buttons = this.component.querySelector('.buttons-container')
    buttons.addEventListener('click', new ButtonHandler())
    const stepVisualizer = new StepVisualizer()
    stepVisualizer.setPlayerNames(
      window.gameConfig.playerName,
      window.gameConfig.opponentName
    )
    stepVisualizer.setPlayerText(this.player, window.gameConfig.source)
    stepVisualizer.setPlayerText(this.opponent, window.gameConfig.source)
  }

  getComponent() {
    if (this.component) return this.component
    const main = document.createElement('main')
    main.className = 'main'
    main.innerHTML = `
      ${this.buttonsContainer.getComponent().outerHTML}
      <div class="container">
        ${this.taskInfo.getComponent().outerHTML}
      </div>
      <div class="container">
        ${this.playerTextBlock.getComponent().outerHTML}
        ${this.opponentTextBlock.getComponent().outerHTML}
      </div>
      ${this.winnerModal.getComponent().outerHTML}
    `
    return main
  }
}
