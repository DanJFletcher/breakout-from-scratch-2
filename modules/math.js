/**
 * Clamp `value` to `min` and `max`.
 * 
 * @param {number} value The value to clamp
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number} The clamped value
 */
export const clamp = (value, min, max) => Math.min(Math.max(min, value), max)