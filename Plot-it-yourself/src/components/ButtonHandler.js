import { StepController } from "./StepController.js"

export class ButtonHandler {
  constructor(){
    this.player = 1
    this.opponent = 2
    this.playerStep = 0
    this.opponentStep = 0
    this.timerDelay = 1000
    this.timerID = 0
    this.stepsCount = window.gameConfig.stepsCount
    this.stepController = new StepController()
    this.rewindButton = document.querySelector('#rewind')
    this.prevButton = document.querySelector('#prev')
    this.playButton = document.querySelector('#play')
    this.nextButton = document.querySelector('#next')
    this.forwardButton = document.querySelector('#forward')
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
        this.play()
      }
      else if (next && !next.disabled) this.next()
      else if (forward && !forward.disabled) this.forward()
    }
  }

  play(){
    this.intervalID = setInterval(() => {
      const startSteps = 2
      const currentStepsCount = this.playerStep + this.opponentStep
      const maxStepsCount = this.stepsCount + startSteps
      if (currentStepsCount >= maxStepsCount){
        clearInterval(this.intervalID)
        alert('finish')
      }
      if (this.playerStep < window.gameConfig.playerSteps.length){
        this.stepController.setStep(this.player, this.playerStep++)
      }
      if (this.opponentStep < window.gameConfig.opponentSteps.length){
        this.stepController.setStep(this.opponent, this.opponentStep++)
      }
    }, this.timerDelay)
  }

  rewind(){
    alert('rewind')
  }

  prev(){
    alert('prev')
  }

  next(){
    alert('next')
  }

  forward(){
    alert('forward')
  }
}
