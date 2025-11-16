/**
 * SWR fetcher with proper error handling
 * Throws an error with the response for non-2xx status codes
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data');
    error.info = await res.json().catch(() => ({ message: res.statusText }));
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default fetcher;
