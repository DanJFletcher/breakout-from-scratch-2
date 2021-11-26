import { Ball } from './modules/entities/ball.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('canvas')
)
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

const ball = new Ball({
  width: 12,
  height: 12,
  position: { x: 100, y: 100 },
  velocity: { x: 300, y: 300 },
})

let dt = 0
let last = performance.now()

/**
 * The game loop.
 * @param {DOMHighResTimeStamp} hrt
 */
function frame(hrt) {
  // How much time has elapsed since last frame?
  // Convert time to seconds
  dt = (hrt - last) / 1000

  // Account for delta time by applying it to the ball's velocity
  ball.position.x += ball.velocity.x * dt
  ball.position.y += ball.velocity.y * dt

  if (ball.position.x + ball.width > canvas.width) {
    ball.position.x = canvas.width - ball.width
    ball.velocity.x = -ball.velocity.x
  } else if (ball.position.x < 0) {
    ball.position.x = 0
    ball.velocity.x = -ball.velocity.x
  }

  if (ball.position.y + ball.height > canvas.height) {
    ball.position.y = canvas.height - ball.height
    ball.velocity.y = -ball.velocity.y
  } else if (ball.position.y < 0) {
    ball.position.y = 0
    ball.velocity.y = -ball.velocity.y
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'white'
  ctx.fillRect(ball.position.x, ball.position.y, ball.width, ball.height)

  // Track the last time for the delta time calculation in the subsequent frame.
  last = hrt

  requestAnimationFrame(frame)
}

// Kick off the game loop!
requestAnimationFrame(frame)
