import { Redis,type Redis as RedisInstanceType } from "ioredis"
import { NODE_ENV, REDIS_URL } from '@/config';

import { REDIS_KYE_PREFIX } from '@/constants';

const globalForRedis = global as unknown as { redis: RedisInstanceType };

if (!REDIS_URL) {
    throw new Error("REDIS_URL is not defined");
}
export const redis =
    globalForRedis.redis ||
    new Redis(REDIS_URL as string, {
        keyPrefix: REDIS_KYE_PREFIX,
    });

if (NODE_ENV !== 'production') globalForRedis.redis = redis;