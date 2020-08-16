const chai = require('chai')
const except = chai.expect
const redis = require('redis');
const client = redis.createClient();
const redisStoreJson = require('..');


describe('getValueByJsonKey',()=>{
    
    it('getValueByJsonKey should return "test"',()=>{
        let code = "ABCD";
        let jsonKey = "testKey"

        redisStoreJson.use(client);

        client.set(code, JSON.stringify({
            "testKey":"test"
        }));

        redisStoreJson.getValueByJsonKey(code,jsonKey)
            .then(data => {
                except(data).to.equal("test")
                client.del(code);
            }) 
            .catch(err => {
                console.error(err);
            })
            

    })
        
})