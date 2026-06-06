import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Validates HTTP method for API routes
 * Returns true if method is allowed, sends error response and returns false otherwise
 */
export function validateMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[]
): boolean {
  if (!req.method || !allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
      allowedMethods,
    });
    return false;
  }
  return true;
}

/**
 * Rate limiting storage (in-memory, replace with Redis for production)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting middleware
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

/**
 * Cleanup old rate limit records (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Apply rate limiting to API route
 */
export function applyRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  options: { limit?: number; windowMs?: number } = {}
): boolean {
  const identifier = req.headers['x-forwarded-for'] as string ||
                    req.socket.remoteAddress ||
                    'unknown';

  const { allowed, remaining, resetTime } = rateLimit(
    identifier,
    options.limit,
    options.windowMs
  );

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', options.limit || 100);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());

  if (!allowed) {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: new Date(resetTime).toISOString(),
    });
    return false;
  }

  return true;
}

/**
 * CORS middleware for widget support
 */
export function applyCORS(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedOrigins: string[] = ['*']
) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return false;
  }

  return true;
}
