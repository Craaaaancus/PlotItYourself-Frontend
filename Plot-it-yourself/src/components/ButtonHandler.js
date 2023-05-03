import { StepController } from "./StepController.js"

export class ButtonHandler {
  constructor(){
    this.player = 1
    this.opponent = 2
    this.playerStep = -1
    this.opponentStep = -1
    this.timerDelay = 1000
    this.timerID = 0
    this.stepsCount = window.gameConfig.stepsCount
    this.lastPlayerStep = window.gameConfig.playerSteps.length - 1
    this.lastOpponentStep = window.gameConfig.opponentSteps.length - 1
    this.rewindButton = document.querySelector('#rewind')
    this.prevButton = document.querySelector('#prev')
    this.playButton = document.querySelector('#play')
    this.nextButton = document.querySelector('#next')
    this.forwardButton = document.querySelector('#forward')
    this.tooltipPlay = document.querySelector('#tooltipTextPlay')
    this.tooltipPause = document.querySelector('#tooltipTextPause')
    this.tooltipRestart = document.querySelector('#tooltipTextRestart')
    this.iconPlay = document.querySelector('#iconPlay')
    this.iconPause = document.querySelector('#iconPause')
    this.iconRestart = document.querySelector('#iconRestart')
    this.stepController = new StepController()
  }

  handleEvent(event){
    if (event.type === 'click'){
      const rewind  = event.target.closest('#rewind')
      const prev    = event.target.closest('#prev')
      const play    = event.target.closest('#play')
      const next    = event.target.closest('#next')
      const forward = event.target.closest('#forward')

      if (rewind && !rewind.disabled) this.rewind()
      else if (prev && !prev.disabled) this.prev()
      else if (play)  {
        switch(play.dataset.status){
          case 'play':
            this.play()
            break
          case 'stop':
            this.stop()
            break
          case 'restart':
            this.restart()
            break
        }
      }
      else if (next && !next.disabled) this.next()
      else if (forward && !forward.disabled) this.forward()
    }
  }

  disableButtons(side = 'all'){
    switch(side){
      case 'left':
        this.rewindButton.disabled = true
        this.prevButton.disabled = true
      case 'right':
        this.nextButton.disabled = true
        this.forwardButton.disabled = true
      case 'all':
        this.rewindButton.disabled = true
        this.prevButton.disabled = true
        this.nextButton.disabled = true
        this.forwardButton.disabled = true
    }
  }

  setButtonState(state = 'play'){
    let playState = 'none', pauseState = 'none', restartState = 'none'
    const none = 'none'
    const inlineBlock = 'inline-block'
    switch (state){
      case 'play':
        playState = inlineBlock
        pauseState = none
        restartState = none
        break
      case 'pause':
        playState = none
        pauseState = inlineBlock
        restartState = none
        break
      case 'restart':
        playState = none
        pauseState = none
        restartState = inlineBlock
        break
    }

    this.tooltipPlay.style.display = playState
    this.tooltipPause.style.display = pauseState
    this.tooltipRestart.style.display = restartState
    this.iconPlay.style.display = playState
    this.iconPause.style.display = pauseState
    this.iconRestart.style.display = restartState

    this.playButton.dataset.status = state
  }

  isFinished(){
    const currentStepsCount = this.playerStep + this.opponentStep
    if (currentStepsCount >= this.stepsCount){
      return true
    }
    else return false
  }

  play(){
    this.disableButtons('all')
    this.setButtonState('pause')
    this.playerStep = this.playerStep > 0 ? this.playerStep : 0
    this.opponentStep = this.opponentStep > 0 ? this.opponentStep : 0
    this.stepController.setStep(this.player, this.playerStep)
    this.stepController.setStep(this.opponent, this.opponentStep)
    this.intervalID = setInterval(() => {
      if (this.isFinished()){
        clearInterval(this.intervalID)
        this.intervalID = 0
        this.setButtonState('restart')
        alert('finish')
      }
      if (this.playerStep < this.lastPlayerStep){
        this.playerStep++
        this.stepController.setStep(this.player, this.playerStep)
      }
      if (this.opponentStep < this.lastOpponentStep){
        this.opponentStep++
        this.stepController.setStep(this.opponent, this.opponentStep)
      }
    }, this.timerDelay)
  }

  stop(){
    if (this.intervalID){
      clearInterval(this.intervalID)
      this.intervalID = 0
    }
    this.setButtonState('play')
  }

  restart(){
    this.playerStep = 0
    this.opponentStep = 0
    this.play()
  }

  rewind(){
    this.playerStep = 0
    this.opponentStep = 0
    this.disableButtons('right')
    this.stepController.setStep(this.player, this.playerStep)
    this.stepController.setStep(this.opponent, this.opponentStep)
  }

  prev(){

    
  }

  next(){
    alert('next')
  }

  forward(){
    this.playerStep = this.lastPlayerStep
    this.opponentStep = this.lastOpponentStep
    this.disableButtons('left')
    this.stepController.setStep(this.player, this.playerStep)
    this.stepController.setStep(this.opponent, this.opponentStep)
    alert('finish')
  }
}
