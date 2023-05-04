export class ButtonVisualizer {
  constructor() {
    this.rewindButton = document.querySelector('#rewind');
    this.prevButton = document.querySelector('#prev');
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.forwardButton = document.querySelector('#forward');
    this.tooltipPlay = document.querySelector('#tooltipTextPlay');
    this.tooltipPause = document.querySelector('#tooltipTextPause');
    this.tooltipRestart = document.querySelector('#tooltipTextRestart');
    this.iconPlay = document.querySelector('#iconPlay');
    this.iconPause = document.querySelector('#iconPause');
    this.iconRestart = document.querySelector('#iconRestart');
  }

  setButtonsDisability(side = 'all', state = true) {
    switch (side) {
      case 'left':
        this.rewindButton.disabled = state;
        this.prevButton.disabled = state;
        break;
      case 'right':
        this.nextButton.disabled = state;
        this.forwardButton.disabled = state;
        break;
      case 'all':
        this.rewindButton.disabled = state;
        this.prevButton.disabled = state;
        this.nextButton.disabled = state;
        this.forwardButton.disabled = state;
        break;
    }
  }

  setPlayButtonIcon(iconType = 'play') {
    let playState = 'none',
      pauseState = 'none',
      restartState = 'none';
    const none = 'none';
    const inlineBlock = 'inline-block';
    switch (iconType) {
      case 'play':
        playState = inlineBlock;
        pauseState = none;
        restartState = none;
        break;
      case 'pause':
        playState = none;
        pauseState = inlineBlock;
        restartState = none;
        break;
      case 'restart':
        playState = none;
        pauseState = none;
        restartState = inlineBlock;
        break;
    }
    this.tooltipPlay.style.display = playState;
    this.tooltipPause.style.display = pauseState;
    this.tooltipRestart.style.display = restartState;
    this.iconPlay.style.display = playState;
    this.iconPause.style.display = pauseState;
    this.iconRestart.style.display = restartState;

    this.playButton.dataset.status = iconType;
  }
}
