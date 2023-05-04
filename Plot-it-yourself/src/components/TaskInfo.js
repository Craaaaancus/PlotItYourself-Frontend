export class TaskInfo {
  constructor(){
    this.component = this.getComponent()
    this.numberOfTask = window.gameConfig.numberOfTask
  }

  getComponent(){
    const taskInfo = document.createElement('div')
    taskInfo.id = 'taskInfo'
    taskInfo.className = 'task-info'

    const firstTaskHTML = `
      <b>Задание 1: </b> удалить лишние и вставить необходимые пробелы
    `
    const secondTaskHTML = `
      <b>Задание 2: </b> заменить все слова “the” на слово “a” и слова
      “The” на слово “A”
    `
    const thirdTaskHTML = `
      <b>Задание 3: </b> удалить повторные вхождения в текст одних 
      и тех же слов
    `
    switch(this.numberOfTask){
      case 1:
        taskInfo.innerHTML = firstTaskHTML
        break
      case 2:
        taskInfo.innerHTML = secondTaskHTML
        break
      case 3:
        taskInfo.innerHTML = thirdTaskHTML
        break
      default:
        taskInfo.innerHTML = ''
    }
    
    return taskInfo
  }
}
