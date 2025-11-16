/**
 * Get domain name from url
 *
 * @param url {string}
 * @return {string} domain name or empty string if invalid
 */
export const getDomain = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.host;
  } catch (error) {
    // Return empty string for invalid URLs
    // The caller should validate this return value
    return '';
  }
};
