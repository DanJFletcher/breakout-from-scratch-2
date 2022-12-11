import { Vector2d } from '../components/vector2d.js'

export class Brick {
  /**
   * Create Brick
   * @param {Object} opts
   * @param {Vector2d} opts.position
   * @param {number} opts.width
   * @param {number} opts.height
   * @param {string} opts.rgba
   * @param {boolean=} opts.visible
   */
  constructor({ position, width, height, rgba, visible = true }) {
    this.position = position
    this.width = width
    this.height = height
    this.rgba = rgba
    this.visible = visible
  }
}
