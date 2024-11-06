/**
 * @typedef {Object} Meeting
 * @property {number} id
 * @property {string} title
 * @property {string} start
 * @property {string} end
 * @property {number} column
 * @property {number} totalConflicts
 * @property {boolean} [modified]
 */

/** @type {{ Slotted: 'Slotted', Overlapping: 'Overlapping' }} */
export const Layout = {
  Slotted: "Slotted",
  Overlapping: "Overlapping",
};
