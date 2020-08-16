var redis = require("redis");
var client;
function RedisClient() {
  var redisHost = "redis-14749.c1.us-central1-2.gce.cloud.redislabs.com";
  var redisPort = process.argv[3] || 14749;
  var redisAuth = "N0MVCaJbZqYvvh9jTolRVEJGL5c1Wh0O";

  client = redis.createClient({
    port: redisPort,
    host: redisHost,
  });

  client.auth(redisAuth, function (err, response) {
    if (err) {
      throw err;
    }
  });
  return client;
}
module.exports = { RedisClient, client: "123" };
