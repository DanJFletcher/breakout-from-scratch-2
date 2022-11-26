import { PLAYER_STARTING_LIVES } from './constants.js'

export class Game {
  playerLives = PLAYER_STARTING_LIVES
  score = 0
  currentLevel = 0

  /**
   * @type {keyof Game.State}
   */
  state = Game.State.Playing

  reset() {
    this.playerLives = PLAYER_STARTING_LIVES
    this.score = 0
    this.currentLevel = 0
    this.state = Game.State.Playing
  }

  static State = {
    Playing: /** @type {'Playing'} */ ('Playing'),
    GameOver: /** @type {'GameOver'} */ ('GameOver'),
    GameWon: /** @type {'GameWon'} */ ('GameWon'),
  }
}
