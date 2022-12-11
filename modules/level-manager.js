import { Brick } from './entities/brick.js'

/**
 * Generate Brick array based on level data
 *
 * @param {object} opts
 * @param {HTMLImageElement} opts.image
 * @param {number} opts.levelIndex
 * @param {number} opts.levelWidth
 * @param {number} opts.levelHeight
 * @param {number} opts.brickWidth
 * @param {number} opts.brickHeight
 * @param {number} opts.brickXOffset
 * @param {number} opts.brickYOffset
 * @returns {Brick[]}
 */
export const generateBricks = ({
  image,
  levelIndex,
  levelWidth,
  levelHeight,
  brickWidth,
  brickHeight,
  brickXOffset,
  brickYOffset,
}) => {
  // Temporary canvas to render level on and read pixel data from
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

  ctx.drawImage(
    image,
    0, // sx
    levelIndex * levelHeight, // sy
    levelWidth, // sWidth
    levelHeight, // sHeight
    0, // dx
    0, // dy
    levelWidth, // dWidth
    levelHeight, // dHeight
  )

  /** @type {Brick[]} */
  const bricks = []

  // Create our bricks
  for (let row = 0; row < levelHeight; row++) {
    for (let col = 0; col < levelWidth; col++) {
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
            x: col + brickXOffset + col * brickWidth,
            y: row + brickYOffset + row * brickHeight,
          },
          width: brickWidth,
          height: brickHeight,
          rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`,
        }),
      )
    }
  }

  return bricks
}
