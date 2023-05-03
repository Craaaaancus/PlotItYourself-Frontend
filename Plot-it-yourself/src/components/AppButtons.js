export class AppButtons {
  getComponent(){
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

  getPrevButton(disabled=false){
    const prevBtn = document.createElement('button')
    prevBtn.id = 'prev'
    prevBtn.className = 'btn'
    if (disabled) prevBtn.disabled = true
    prevBtn.innerHTML = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,5V19H16V5M14,5V19L3,12"></path>
      </svg>
    `

    return prevBtn
  }

  getNextButton(disabled=false){
    const nextBtn = document.createElement('button')
    nextBtn.id = 'next'
    nextBtn.className = 'btn'
    if (disabled) nextBtn.disabled = true
    nextBtn.innerHTML = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5,5V19H8V5M10,5V19L21,12"></path>
      </svg>
    `

    return nextBtn
  }

  getRewindButton(disabled=false){
    const rewindBtn = document.createElement('button')
    rewindBtn.id = 'rewind'
    rewindBtn.className = 'btn'
    if (disabled) rewindBtn.disabled = true
    rewindBtn.innerHTML = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17,5H14V19H17V5M12,5L1,12L12,19V5M22,5H19V19H22V5Z"></path>
      </svg>
    `

    return rewindBtn
  }

  getForwardButton(disabled=false){
    const forwardBtn = document.createElement('button')
    forwardBtn.id = 'forward'
    forwardBtn.className = 'btn'
    if (disabled) forwardBtn.disabled = true
    forwardBtn.innerHTML = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7,5H10V19H7V5M12,5L23,12L12,19V5M2,5H5V19H2V5Z"></path>
      </svg>
    `

    return forwardBtn
  }

  getPlayButton(){
    const playBtn = document.createElement('button')
    playBtn.id = 'play'
    playBtn.className = 'btn'
    playBtn.dataset.status = 'play'
    playBtn.innerHTML = `
      <span id="iconRestart" style="display:none;">
        <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"></path>
        </svg>
      </span>
      <span id="iconPlay" style="display:inline-block;">
        <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
        </svg>
      </span>
      <span id="iconPause" style="display:none;">
        <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
        </svg>
      </span>
    `

    return playBtn
  }
}