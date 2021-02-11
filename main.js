const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
  'canvas',
))
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

ctx.fillStyle = 'yellow'
ctx.fillRect(200, 100, 100, 50)

ctx.strokeStyle = 'red'
ctx.strokeRect(400, 100, 100, 50)

ctx.clearRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = 'white'
ctx.font = ' 24px serif'
ctx.textAlign = 'center'
ctx.fillText('Canvas cleared!! 🎉', canvas.width / 2, canvas.height / 2)
