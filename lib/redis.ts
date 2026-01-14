import { Redis } from "ioredis";
import { env } from "./env";

const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis(env.REDIS_URL, {
    // Retry strategy for resilience
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 3,
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export const CACHE_TTL = env.REDIS_CACHE_TTL;

// Helper to get or set cache
export async function getOrSetCache<T>(
  key: string,
  cb: () => Promise<T>,
  ttl = CACHE_TTL
): Promise<T> {
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const freshData = await cb();
    if (freshData) {
      await redis.set(key, JSON.stringify(freshData), "EX", ttl);
    }
    return freshData;
  } catch (error) {
    console.error(`Redis Cache Error [${key}]:`, error);
    // Fallback to fresh data if redis fails
    return cb();
  }
}
