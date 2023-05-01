import { AppButtons } from './AppButtons.js';
import { PlayerText } from './PlayerText.js';
import { StepController } from './StepController.js';
import { ButtonHandler } from './ButtonHandler.js';

export class App {
  constructor() {
    this.appButtons = new AppButtons();
    this.player = 1;
    this.opponent = 2;
    this.playerTextBlock = new PlayerText(this.player);
    this.opponentTextBlock = new PlayerText(this.opponent);
    this.stepController = new StepController();
    this.ButtonHandler = new ButtonHandler();
    this.component = this.getComponent();
  }

  start() {
    this.stepController.setPlayer(this.player)
    this.stepController.setPlayerText(this.player, 0)
    this.stepController.setPlayer(this.opponent)
    this.stepController.setPlayerText(this.opponent, 0)
    const buttons = this.component.querySelector('.buttons-container');
    buttons.addEventListener('click', this.ButtonHandler);
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
    `;

    return main;
  }
}
