const redisJson = require('../index');         //import the module
const redis     = require('redis');            //import redis module
const client    = redis.createClient();        //create a new redis connection

redisJson.use(client);                      //give the redis instance to redis-json-store

let testSet = {
    "testKey1" : "test",
    "testKey2" : "test2"
}

redisJson.set("REDIS_DB_KEY", testSet)
	.then(() =>{
    	console.log("succefuly set data");
	})
	.catch(() =>{
    	console.log("error when set data");
	})


