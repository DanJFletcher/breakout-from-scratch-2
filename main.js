import {
  aabbBottom,
  aabbLeft,
  aabbRight,
  aabbTop,
  intersects,
} from './modules/collision.js'
import { Ball } from './modules/entities/ball.js'
import { Paddle } from './modules/entities/paddle.js'
import { clamp } from './modules/math.js'

const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector('canvas')
)
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

const paddle = new Paddle({
  position: { x: canvas.width / 2 - 104 / 2, y: canvas.height - 32 },
  width: 104,
  height: 16,
})

/**
 * Track the mouse
 */
const mouse = {
  position: { x: paddle.position.x, y: 0 },
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

  // Update the position of the paddle based on the mouse
  paddle.position.x = mouse.position.x

  // Move and check for collisions along the x axis
  ball.position.x += ball.velocity.x * dt
  let ballPaddleCollisionHandled = false

  if (intersects(ball, paddle)) {
    ballPaddleCollisionHandled = true

    // We know the ball is colliding with the paddle, but we don't know which side
    const closestSide =
      Math.abs(aabbRight(paddle) - aabbLeft(ball)) <
        Math.abs(aabbLeft(paddle) - aabbRight(ball))
        ? 'right'
        : 'left'
    // Are we moving to the left or right?
    if (ball.velocity.x < 0) {
      // Moving to the left
      if (closestSide === 'left') {
        // We hit the left side of the paddle
        ball.position.x = aabbLeft(paddle) - ball.width
      } else {
        // We hit the right side of the paddle
        ball.position.x = aabbRight(paddle)
        ball.velocity.x = -ball.velocity.x
      }
    } else if (ball.velocity.x > 0) {
      // Moving to the right
      if (closestSide === 'right') {
        // We hit the right side of the paddle
        ball.position.x = aabbRight(paddle)
      } else {
        // We hit the left side of the paddle
        ball.position.x = aabbLeft(paddle) - ball.width
        ball.velocity.x = -ball.velocity.x
      }
    }
  }

  // Move and check for collisions along the y axis
  ball.position.y += ball.velocity.y * dt

  if (!ballPaddleCollisionHandled && intersects(ball, paddle)) {
    ball.position.y = aabbTop(paddle) - ball.height
    ball.velocity.y = -ball.velocity.y
  }

  if (aabbRight(ball) > canvas.width) {
    ball.position.x = canvas.width - ball.width
    ball.velocity.x = -ball.velocity.x
  } else if (aabbLeft(ball) < 0) {
    ball.position.x = 0
    ball.velocity.x = -ball.velocity.x
  }

  if (aabbBottom(ball) > canvas.height) {
    ball.position.y = canvas.height - ball.height
    ball.velocity.y = -ball.velocity.y
  } else if (aabbTop(ball) < 0) {
    ball.position.y = 0
    ball.velocity.y = -ball.velocity.y
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'white'
  ctx.fillRect(
    paddle.position.x,
    paddle.position.y,
    paddle.width,
    paddle.height,
  )
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

  // Clamp the mouse position to the canvas width
  mouse.position.x = clamp(mouse.position.x, 0, canvas.width - paddle.width)
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
