import { PLAYER_STARTING_LIVES } from './constants.js'
import { LevelManager } from './level-manager.js'

export class Game {
  playerLives = PLAYER_STARTING_LIVES
  score = 0
  currentLevel = 0

  /**
   * @type {keyof Game.State}
   */
  state = Game.State.Playing

  /**
   * @param {LevelManager} levelManager
   */
  constructor(levelManager) {
    this.levelManager = levelManager
  }

  reset() {
    this.playerLives = PLAYER_STARTING_LIVES
    this.score = 0
    this.levelManager.changeLevel(1)
    this.state = Game.State.Playing
  }

  static State = {
    Playing: /** @type {'Playing'} */ ('Playing'),
    GameOver: /** @type {'GameOver'} */ ('GameOver'),
    GameWon: /** @type {'GameWon'} */ ('GameWon'),
  }
}
