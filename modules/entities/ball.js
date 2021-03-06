import { Vecotor2d } from '../components/vector2d.js'

export class Ball {
  /**
   *
   * @param {object} opts
   * @param {number} opts.width
   * @param {number} opts.height
   * @param {Vecotor2d} opts.position
   * @param {Vecotor2d} opts.velocity
   */
  constructor(opts) {
    this.width = opts.width
    this.height = opts.height
    this.position = opts.position
    this.velocity = opts.velocity
  }
}
