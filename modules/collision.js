import { Vector2d } from "./components/vector2d.js";

/**
 * @typedef AABB
 * @property {Vector2d} position
 * @property {number} width
 * @property {number} height
 */

/**
 * Returns the left side of the AABB
 * @param {AABB} aabb
 */
export const aabbLeft = (aabb) => aabb.position.x

/**
 * Returns the right side of the AABB
 * @param {AABB} aabb
 */
export const aabbRight = (aabb) => aabb.position.x + aabb.width

/**
 * Returns the top of the AABB
 * @param {AABB} aabb 
 */
export const aabbTop = (aabb) => aabb.position.y

/**
 * Returns the bottom of the AABB 
 * @param {AABB} aabb 
 */
export const aabbBottom = (aabb) => aabb.position.y + aabb.height

/**
 * Returns true if the two AABBs are colliding.
 * 
 * Axis-Aligned Bounding Box - no rotation
 * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
 * 
 * @param {AABB} aabb1 
 * @param {AABB} aabb2 
 */
export const intersects = (aabb1, aabb2) => {
	return (
		aabbLeft(aabb1) < aabbRight(aabb2) &&
		aabbRight(aabb1) > aabbLeft(aabb2) &&
		aabbTop(aabb1) < aabbBottom(aabb2) &&
		aabbBottom(aabb1) > aabbTop(aabb2)
	)
}

