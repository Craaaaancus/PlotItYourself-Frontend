import { StepController } from '../step'
import { WinnerModal } from '../winner-modal/WinnerModal.js'
import { ButtonVisualizer } from './ButtonVisualizer.js'

export class ButtonHandler {
  constructor() {
    this.player = 1
    this.opponent = 2
    this.playerStep = -1
    this.opponentStep = -1
    this.timerDelay = 1000
    this.timerID = 0
    this.stepsCount = window.gameConfig.stepsCount
    this.lastPlayerStep = window.gameConfig.playerSteps.length - 1
    this.lastOpponentStep = window.gameConfig.opponentSteps.length - 1
    this.maxNumberOfSteps = window.gameConfig.maxSteps
    if (this.lastPlayerStep >= this.lastOpponentStep) {
      this.maxSteps = this.lastPlayerStep
    } else this.maxSteps = this.lastOpponentStep

    this.stepController = new StepController()
    this.winnerModal = new WinnerModal()
    this.visualizer = new ButtonVisualizer()
  }

  handleEvent(event) {
    if (event.type === 'click') {
      const rewind = event.target.closest('#rewind')
      const prev = event.target.closest('#prev')
      const play = event.target.closest('#play')
      const next = event.target.closest('#next')
      const forward = event.target.closest('#forward')

      if (rewind && !rewind.disabled) this.rewind()
      else if (prev && !prev.disabled) this.prev()
      else if (play) {
        switch (play.dataset.status) {
          case 'play':
            this.play(this.playerStep, this.opponentStep)
            break
          case 'pause':
            this.pause()
            break
          case 'restart':
            this.restart()
            break
        }
      } else if (next && !next.disabled) this.next()
      else if (forward && !forward.disabled) this.forward()
    }
  }

  setButtonsState() {
    const isFirstStep = this.playerStep === 0 && this.opponentStep === 0
    if (isFirstStep) this.visualizer.setButtonsDisability('left', true)
    else this.visualizer.setButtonsDisability('left', false)
    const isLastStep =
      this.playerStep === this.lastPlayerStep &&
      this.opponentStep === this.lastOpponentStep
    if (isLastStep) this.visualizer.setButtonsDisability('right', true)
    else this.visualizer.setButtonsDisability('right', false)
  }

  setGameStep() {
    this.stepController.setStep(this.player, this.playerStep)
    this.stepController.setStep(this.opponent, this.opponentStep)
    this.setGameFinishVisibility()
  }

  setGameFinishVisibility() {
    const maxNumberOfStepsExceedMessage =
      'Превышено максимальное количество ходов'
    const taskEndMessage = 'Задача завершена'
    const playerFinish = document.querySelector('#playerFinish')
    if (playerFinish && this.playerStep === this.lastPlayerStep) {
      playerFinish.style.visibility = 'visible'
      if (this.lastPlayerStep > this.maxNumberOfSteps) {
        playerFinish.textContent = maxNumberOfStepsExceedMessage
      } else playerFinish.textContent = taskEndMessage
    } else playerFinish.style.visibility = 'hidden'

    const opponentFinish = document.querySelector('#opponentFinish')
    if (opponentFinish && this.opponentStep === this.lastOpponentStep) {
      opponentFinish.style.visibility = 'visible'
      if (this.lastOpponentStep > this.maxNumberOfSteps) {
        opponentFinish.textContent = maxNumberOfStepsExceedMessage
      } else opponentFinish.textContent = taskEndMessage
    } else opponentFinish.style.visibility = 'hidden'
  }

  isFinished() {
    const currentStepsCount = this.playerStep + this.opponentStep
    if (currentStepsCount >= this.stepsCount) {
      return true
    } else return false
  }

  play(playerCurrentStep = 0, opponentCurrentStep = 0) {
    this.visualizer.setButtonsDisability('all', true)
    this.visualizer.setPlayButtonIcon('pause')
    this.playerStep = playerCurrentStep > 0 ? playerCurrentStep : 0
    this.opponentStep = opponentCurrentStep > 0 ? opponentCurrentStep : 0
    this.setGameStep()
    this.intervalID = setInterval(() => {
      if (this.isFinished()) {
        clearInterval(this.intervalID)
        this.intervalID = 0
        this.visualizer.setPlayButtonIcon('restart')
        this.setButtonsState()
        this.winnerModal.open()
      }
      if (this.playerStep < this.lastPlayerStep) {
        this.playerStep++
        this.stepController.setStep(this.player, this.playerStep)
      }
      if (this.opponentStep < this.lastOpponentStep) {
        this.opponentStep++
        this.stepController.setStep(this.opponent, this.opponentStep)
      }
      this.setGameFinishVisibility()
    }, this.timerDelay)
  }

  pause() {
    if (this.intervalID) {
      clearInterval(this.intervalID)
      this.intervalID = 0
    }
    this.visualizer.setPlayButtonIcon('play')
    this.setButtonsState()
  }

  restart() {
    this.playerStep = 0
    this.opponentStep = 0
    this.play()
  }

  rewind() {
    this.playerStep = 0
    this.opponentStep = 0
    this.setButtonsState()
    this.setGameStep()
  }

  prev() {
    let decreasePlayerStep = false,
      decreaseOpponentStep = false
    if (this.playerStep > 0 && this.playerStep >= this.opponentStep) {
      decreasePlayerStep = true
    }
    if (this.opponentStep > 0 && this.opponentStep >= this.playerStep) {
      decreaseOpponentStep = true
    }
    if (decreasePlayerStep) this.playerStep--
    if (decreaseOpponentStep) this.opponentStep--

    this.setButtonsState()
    this.setGameStep()
  }

  next() {
    if (this.playerStep < this.lastPlayerStep) this.playerStep++
    if (this.opponentStep < this.lastOpponentStep) this.opponentStep++
    this.setButtonsState()
    this.setGameStep()
    if (this.isFinished()) {
      this.visualizer.setPlayButtonIcon('restart')
      this.winnerModal.open()
    }
  }

  forward() {
    this.playerStep = this.lastPlayerStep
    this.opponentStep = this.lastOpponentStep
    this.visualizer.setPlayButtonIcon('restart')
    this.setButtonsState()
    this.setGameStep()
    this.winnerModal.open()
  }
}
