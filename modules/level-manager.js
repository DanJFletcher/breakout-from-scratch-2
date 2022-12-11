import { loadImage } from './asset-loaders.js'
import { Brick } from './entities/brick.js'

export class LevelManager {
  #currentLevel = 1
  #numberOfLevels = 0
  #levelWidth = 0
  #levelHeight = 0
  #brickWidth = 0
  #brickHeight = 0
  #brickXOffset = 0
  #brickYOffset = 0

  /** @type {HTMLImageElement | null} */
  #image = null

  /** @type {Brick[]} */
  bricks = []

  /**
   * Load new levels image
   *
   * @param {object} opts
   * @param {string} opts.imagePath - image URL
   * @param {number} opts.levelWidth as units of `brickWidth`
   * @param {number} opts.levelHeight as units of `brickHeight`
   * @param {number} opts.brickWidth
   * @param {number} opts.brickHeight
   * @param {number} opts.brickXOffset
   * @param {number} opts.brickYOffset
   */
  async loadLevels({
    imagePath,
    levelWidth,
    levelHeight,
    brickWidth,
    brickHeight,
    brickXOffset,
    brickYOffset,
  }) {
    this.#currentLevel = 0
    this.bricks = []

    this.#image = await loadImage(imagePath)
    this.#levelWidth = levelWidth
    this.#levelHeight = levelHeight
    this.#brickWidth = brickWidth
    this.#brickHeight = brickHeight
    this.#brickXOffset = brickXOffset
    this.#brickYOffset = brickYOffset
    this.#numberOfLevels = this.#image.height / levelHeight

    return this
  }

  /**
   * Change level
   * @param {number} num Level number
   */
  changeLevel(num) {
    this.bricks = this.#generateBricks(num - 1)
  }

  /**
   * Generate Brick array based on level data
   *
   * @param {number} levelIndex
   * @returns {Brick[]}
   */
  #generateBricks(levelIndex) {
    if (this.#image === null) {
      throw new Error('No levels image loaded')
    }

    // Temporary canvas to render level on and read pixel data from
    const canvas = document.createElement('canvas')
    canvas.width = this.#image.width
    canvas.height = this.#image.height
    const ctx = /** @type {CanvasRenderingContext2D} */ (
      canvas.getContext('2d')
    )

    ctx.drawImage(
      this.#image,
      0, // sx
      levelIndex * this.#levelHeight, // sy
      this.#levelWidth, // sWidth
      this.#levelHeight, // sHeight
      0, // dx
      0, // dy
      this.#levelWidth, // dWidth
      this.#levelHeight, // dHeight
    )

    /** @type {Brick[]} */
    const bricks = []

    // Create our bricks
    for (let row = 0; row < this.#levelHeight; row++) {
      for (let col = 0; col < this.#levelWidth; col++) {
        const pixel = ctx.getImageData(col, row, 1, 1)
        const [r, g, b, a] = pixel.data

        // NOTE: Alpha is expressed in the range of 0 - 1, so we normalize the value
        // by dividing by 255.
        const alpha = a / 255

        // Transparent pixel, no brick.
        if (alpha === 0) continue

        bricks.push(
          new Brick({
            position: {
              x: col + this.#brickXOffset + col * this.#brickWidth,
              y: row + this.#brickYOffset + row * this.#brickHeight,
            },
            width: this.#brickWidth,
            height: this.#brickHeight,
            rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`,
          }),
        )
      }
    }

    return bricks
  }
}
