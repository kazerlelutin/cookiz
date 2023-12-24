/**
 *
 * @param {Number} base - the base price
 * @param {Number} num - the number of items already purchased
 * @param {Number} baseRate - the rate at which the price increases
 * @description Calculates the price of an item based on the base price, the number of items already purchased and the rate at which the price increases.
 * @returns {Number} - the price of the item
 */
export function getPrice(base, num, baseRate) {
  const rate = baseRate || 1.3
  return Math.round(base * Math.pow(rate, num))
}
