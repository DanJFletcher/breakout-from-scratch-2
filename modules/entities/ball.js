import { Vector2d } from '../components/vector2d.js'

export class Ball {
  /**
   * @type {keyof Ball.State}
   */
  state = Ball.State.OnPaddle

  /** @type {Vector2d} */
  initialVelocity

  /**
   *
   * @param {object} opts
   * @param {number} opts.width
   * @param {number} opts.height
   * @param {Vector2d} opts.position
   * @param {Vector2d} opts.velocity
   * @param {Vector2d} opts.maxVelocity
   * @param {Vector2d} opts.paddleBounceFactor
   * @param {Vector2d} opts.paddleCollisionSpeedBoost
   */
  constructor(opts) {
    this.width = opts.width
    this.height = opts.height
    this.position = opts.position
    this.velocity = opts.velocity
    this.maxVelocity = opts.maxVelocity
    this.paddleBounceFactor = opts.paddleBounceFactor
    this.paddleCollisionSpeedBoost = opts.paddleCollisionSpeedBoost

    this.initialVelocity = opts.velocity
  }

  static State = {
    OnPaddle: /** @type {'OnPaddle'} */ ('OnPaddle'),
    Free: /** @type {'Free'} */ ('Free'),
  }

  /**
   * Return center position
   */
  get center() {
    return {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
  }

  /**
   * Rest state, and velocity of ball
   */
  reset() {
    this.state = Ball.State.OnPaddle
    this.velocity = this.initialVelocity
  }
}
