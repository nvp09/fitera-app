/**
 * Format date to readable string
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format date with time
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} Formatted date with time string
 */
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

