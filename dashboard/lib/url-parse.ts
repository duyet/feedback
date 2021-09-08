/**
 * Get domain name from url
 *
 * @param url {string}
 * @return {string} domain name
 */
export const getDomain = (url: string): string => {
  const parsed = new URL(url);
  return parsed.host;
};
