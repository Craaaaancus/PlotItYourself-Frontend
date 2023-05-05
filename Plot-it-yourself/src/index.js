import { App } from './components/app/App.js'
import './global.scss'

async function start() {
  const fetchURL = '/game_config'
  try {
    const data = await fetch(fetchURL)
    if (!data.ok) {
      console.log(`
        Error ${data.status}: ${data.statusText}
      `)
      throw Error(data.statusText)
    }
    window.gameConfig = await data.json()
  } catch (e) {
    console.error(e)
  }

  const app = new App()
  app.start()
}

start()
