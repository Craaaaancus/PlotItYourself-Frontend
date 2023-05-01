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
    const delay = 500
    let playerStep = 1
    let opponentStep = 1
    let intervalID = setInterval(() => {
      this.stepController.lengthStep(this.player, playerStep++)
      this.stepController.lengthStep(this.opponent, opponentStep++)
      //this.stepController.setStep(this.player, playerStep++)
      //this.stepController.setStep(this.opponent, opponentStep++)
      if (playerStep + opponentStep > this.stepsCount + 2){
        clearInterval(intervalID)
        alert('f')
      }
    }, delay)
  }


}
