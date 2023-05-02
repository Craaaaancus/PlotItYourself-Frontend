import { AppButtons } from './AppButtons.js';
import { PlayerText } from './PlayerText.js';
import { ButtonHandler } from './ButtonHandler.js';
import { StepVisualizer } from './StepVisualizer.js';

export class App {
  constructor() {
    this.appButtons = new AppButtons();
    this.player = 1;
    this.opponent = 2;
    this.playerTextBlock = new PlayerText(this.player);
    this.opponentTextBlock = new PlayerText(this.opponent);
    this.component = this.getComponent();
  }

  start() {
    document.body.append(this.component)
    const buttons = this.component.querySelector('.buttons-container');
    buttons.addEventListener('click', new ButtonHandler());
    const stepVisualizer = new StepVisualizer()
    stepVisualizer.setPlayersText(
      window.gameConfig.source, window.gameConfig.source
    )
    stepVisualizer.setPlayersName(
      window.gameConfig.playerName, window.gameConfig.opponentName
    )
  }

  getComponent() {
    if (this.component) return this.component;
    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = `
      ${this.appButtons.getComponent().outerHTML}
      <div class="container">
        ${this.playerTextBlock.getComponent().outerHTML}
        ${this.opponentTextBlock.getComponent().outerHTML}
      </div>
    `
    return main;
  }
}
