/**
 * General common functions for use in JSGameTemplate
 *
 * common.js
 * Luke Jones - Aug. 2025
 */

/**
 * Clamp given value between provided minimum and maximum boundaries
 * @param v value to clamp
 * @param mn minimum boundary
 * @param mx maximum boundary
 * @returns {number} value clamped between minimum and maximum boundaries
 */
function clamp(v, mn, mx) {
    return Math.max(mn, Math.min(v, mx));
}

/**
 * Check if value v lies between mn and mx
 * @param v value to check
 * @param mn minimum end of range
 * @param mx maximum end of range
 * @returns {boolean} whether the value lies between the min and max.
 */
function rangeCheck(v, mn, mx) {
    return (v <= mx && v >= mn);
}

/**
 * Return lerped value between two values based on provided ratio
 *
 * @example
 * const a = 0;
 * const b = 20;
 * let c = lerp(a, b, 0.5);
 * console.log(c);
 *
 * // Output: 10
 *
 * @param va Start value
 * @param vb End Value
 * @param ratio Lerp ratio
 * @returns {*} Lerped value
 */
function lerp(va, vb, ratio) {
    return va + ratio * (vb - va);
}

/**
 * Check whether the boundaries of the radii of two points overlap eachother.
 * @param x1 X position of point 1
 * @param y1 Y position of point 1
 * @param r1 Radius of the area around point 1
 * @param x2 X position of point 2
 * @param y2 Y position of point 2
 * @param r2 Radius of the area around point 2
 * @returns {boolean} Whether the areas overlap eachother
 */
function checkRadialOverlap(x1, y1, r1, x2, y2, r2) {
    return (Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow(y1 - y2, 2)) <= (r1 + r2));
}

/**
 * Check whether two provided rectangular regions overlap eachother
 * @param x1 left position of region 1
 * @param y1 top position of region 1
 * @param w1 width of region 1
 * @param h1 height of region 1
 * @param x2 left position of region 2
 * @param y2 top position of region 2
 * @param w2 width of region 2
 * @param h2 height of region 2
 * @returns {boolean} whether the two regions overlap
 */
function checkRegionOverlapfunction(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        x1 + w1 <= x2 ||
        x2 + w2 <= x1 ||
        y1 + h1 <= y2 ||
        y2 + h2 <= y1
    );
}
