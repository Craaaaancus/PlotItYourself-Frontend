import { ButtonIcon } from './ButtonIcon.js'

export class ButtonsContainer {
  getComponent() {
    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = 'container buttons-container'
    buttonsContainer.innerHTML = `
      <div class="tooltip">
        ${this.getRewindButton(true).outerHTML}
        <span class="tooltip-text">Перемотать в начало</span>
      </div>
      <div class="tooltip">
        ${this.getPrevButton(true).outerHTML}
        <span class="tooltip-text">Шаг назад</span>
      </div>
      <div class="tooltip">
        ${this.getPlayButton().outerHTML}
        <span 
          id="tooltipTextRestart"
          class="tooltip-text"
          style="display: none">
          Рестарт
        </span>
        <span 
          id="tooltipTextPlay"
          class="tooltip-text"
          style="display: inline-block">
          Запустить
        </span>
        <span 
          id="tooltipTextPause"
          class="tooltip-text"
          style="display: none">
          Пауза
        </span>
      </div>
      <div class="tooltip">
        ${this.getNextButton().outerHTML}
        <span class="tooltip-text">Шаг вперед</span>
      </div>
      <div class="tooltip">
        ${this.getForwardButton().outerHTML}
        <span class="tooltip-text">Перемотать в конец</span>
      </div>
    `

    return buttonsContainer
  }

  getPrevButton(disabled = false) {
    const prevBtn = document.createElement('button')
    prevBtn.id = 'prev'
    prevBtn.className = 'btn'
    if (disabled) prevBtn.disabled = true
    prevBtn.innerHTML = new ButtonIcon('prev').getIconHTML()

    return prevBtn
  }

  getNextButton(disabled = false) {
    const nextBtn = document.createElement('button')
    nextBtn.id = 'next'
    nextBtn.className = 'btn'
    if (disabled) nextBtn.disabled = true
    nextBtn.innerHTML = new ButtonIcon('next').getIconHTML()

    return nextBtn
  }

  getRewindButton(disabled = false) {
    const rewindBtn = document.createElement('button')
    rewindBtn.id = 'rewind'
    rewindBtn.className = 'btn'
    if (disabled) rewindBtn.disabled = true
    rewindBtn.innerHTML = new ButtonIcon('rewind').getIconHTML()

    return rewindBtn
  }

  getForwardButton(disabled = false) {
    const forwardBtn = document.createElement('button')
    forwardBtn.id = 'forward'
    forwardBtn.className = 'btn'
    if (disabled) forwardBtn.disabled = true
    forwardBtn.innerHTML = new ButtonIcon('forward').getIconHTML()

    return forwardBtn
  }

  getPlayButton() {
    const playBtn = document.createElement('button')
    playBtn.id = 'play'
    playBtn.className = 'btn'
    playBtn.dataset.status = 'play'
    playBtn.innerHTML = `
      <span id="iconRestart" style="display:none;">
        ${new ButtonIcon('restart').getIconHTML()}
      </span>
      <span id="iconPlay" style="display:inline-block;">
        ${new ButtonIcon('play').getIconHTML()}
      </span>
      <span id="iconPause" style="display:none;">
        ${new ButtonIcon('pause').getIconHTML()}
      </span>
    `

    return playBtn
  }
}
