import { Vector2d } from '../components/vector2d.js'

export class Paddle {
  /**
   * @param {Object} opts
   * @param {Vector2d} opts.position
   * @param {number} opts.width
   * @param {number} opts.height
   */
  constructor(opts) {
    this.width = opts.width
    this.height = opts.height
    this.position = opts.position
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
}
