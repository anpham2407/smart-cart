import redis from 'redis';
import bluebird from 'bluebird';
import { redis as redisOptions } from '../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient(redisOptions);
 
client.on('error', function (err) {
    console.error(`Redis Error: ${err}`);
    process.exit(0); 
});
 
export default client;