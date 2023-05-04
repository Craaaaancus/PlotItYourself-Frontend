export class ButtonIcon {
  constructor(iconType){
    this.iconType = iconType
  }

  getIconHTML(){
    const rewindIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17,5H14V19H17V5M12,5L1,12L12,19V5M22,5H19V19H22V5Z"></path>
      </svg>
    `
    const prevIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,5V19H16V5M14,5V19L3,12"></path>
      </svg>
    `
    const nextIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5,5V19H8V5M10,5V19L21,12"></path>
      </svg>
    `
    const forwardIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7,5H10V19H7V5M12,5L23,12L12,19V5M2,5H5V19H2V5Z"></path>
      </svg>
    `
    const restartIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"></path>
      </svg>
    `
    const playIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
      </svg>
    `
    const pauseIcon = `
      <svg style="width:24px;height:24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
      </svg>
    `
    switch(this.iconType){
      case 'prev':
        return prevIcon
      case 'next':
        return nextIcon
      case 'rewind':
        return rewindIcon
      case 'forward':
        return forwardIcon
      case 'play':
        return playIcon
      case 'restart':
        return restartIcon
      case 'pause':
        return pauseIcon
    }
  }
}
