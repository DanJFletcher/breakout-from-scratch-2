import { Ball } from './modules/entities/ball.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('canvas')
)
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

/**
 * Track the mouse
 */
const mouse = {
  position: { x: 0, y: 0 },
}

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

  ctx.fillStyle = 'White'
  ctx.font = 'normal 24pt Arial'

  ctx.fillText('mouse x: ' + mouse.position.x, 10, 26)
  ctx.fillText('mouse y: ' + mouse.position.y, 10, 56)

  ctx.fillStyle = 'white'
  ctx.fillRect(ball.position.x, ball.position.y, ball.width, ball.height)

  // Track the last time for the delta time calculation in the subsequent frame.
  last = hrt

  requestAnimationFrame(frame)
}

/**
 * Handle mouse move events.
 * @param {MouseEvent} e
 */
function mouseMoveHandler(e) {
  // `movementX` is a relative position. It's the change in position only, so
  // we need to add it to the mouse position.
  mouse.position.x += e.movementX
}

function pointerLockChange() {
  // We'll subscribe to mousemove events if the canvas is the active pointerLockElement
  if (document.pointerLockElement === canvas) {
    document.addEventListener('mousemove', mouseMoveHandler)
  } else {
    document.removeEventListener('mousemove', mouseMoveHandler)
  }
}

// On click, request pointer lock
canvas.addEventListener('click', canvas.requestPointerLock)

document.addEventListener('pointerlockchange', pointerLockChange)

// Kick off the game loop!
requestAnimationFrame(frame)
