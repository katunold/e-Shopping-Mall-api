import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

client.on('error', err => {
  // eslint-disable-next-line no-console
  console.log(`Something went wrong ${err}`);
});

// eslint-disable-next-line import/prefer-default-export
export const redisdb = {
  expire: 60,
  set: promisify(client.set).bind(client),
  setex: promisify(client.setex).bind(client),
  get: promisify(client.get).bind(client),
  scan: promisify(client.scan).bind(client),
  delete: promisify(client.del).bind(client),
  clear: promisify(client.flushdb).bind(client),
};

export default client;
