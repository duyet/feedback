import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { validateMethod } from '../../lib/api-middleware';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  database: {
    connected: boolean;
    latency?: number;
  };
  version?: string;
}

/**
 * Health Check Endpoint
 * GET /api/health
 *
 * Returns the health status of the application
 * Useful for monitoring, load balancers, and container orchestration
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthStatus>
) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['GET'])) return;

  const startTime = Date.now();

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - startTime;

    const healthStatus: HealthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      database: {
        connected: true,
        latency: dbLatency,
      },
      version: process.env.npm_package_version,
    };

    // Set cache headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

    return res.status(200).json(healthStatus);
  } catch (error) {
    const healthStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      database: {
        connected: false,
      },
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('Health check failed:', error);
    }

    return res.status(503).json(healthStatus);
  }
}
