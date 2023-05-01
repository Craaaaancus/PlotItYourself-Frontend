import { StepController } from "./StepController.js"

export class ButtonHandler {
  constructor(){
    this.player = 1
    this.opponent = 2
    this.stepsCount = window.gameConfig.stepsCount
    this.stepController = new StepController()
  }

  handleEvent(event){
    if (event.type === 'click'){
      const rewind  = event.target.closest('#rewind')
      const prev    = event.target.closest('#prev')
      const play    = event.target.closest('#play')
      const next    = event.target.closest('#next')
      const forward = event.target.closest('#forward')

      if (rewind) this.rewind()
      if (prev) this.prev()
      if (play) this.play()
      if (next) this.next()
      if (forward) this.forward()
    }
  }

  play(){
    const delay = 1000
    let playerStep = 0
    let opponentStep = 0
    let intervalID = setInterval(() => {
      if (playerStep < window.gameConfig.playerSteps.length){
        this.stepController.setStep(this.player, playerStep++)
      }
      if (opponentStep < window.gameConfig.opponentSteps.length){
        this.stepController.setStep(this.opponent, opponentStep++)
      }
      let startSteps = 2
      if (playerStep + opponentStep >= this.stepsCount + startSteps){
        clearInterval(intervalID)
        alert('finish')
      }
    }, delay)
  }
}
