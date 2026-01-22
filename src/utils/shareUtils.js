/**
 * Copy URL to clipboard
 * @param {string} url - URL to copy
 * @returns {Promise<void>}
 */
export async function copyToClipboard(url) {
  await navigator.clipboard.writeText(url);
}

/**
 * Get share URLs for social media
 * @param {string} url - URL to share
 * @returns {Object} Share URLs for different platforms
 */
export function getShareUrls(url) {
  return {
    facebook: `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://www.twitter.com/share?&url=${encodeURIComponent(url)}`,
  };
}

