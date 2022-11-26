
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
}