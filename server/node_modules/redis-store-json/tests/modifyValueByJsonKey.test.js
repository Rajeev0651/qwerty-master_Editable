const chai = require('chai')
const except = chai.expect
const redis = require('redis');
const client = redis.createClient();
const redisStoreJson = require('..');
const getInformationByKey = require('../actions/getInformationByKey')


describe('modifyValueByJSONkey',()=>{
    
    it('modifyValueByJSONkey() should correcty modify data',()=>{
        let code = "BBBB";
        let jsonKey = "testKey";
        let newValue = "test1";

        redisStoreJson.use(client);

        client.set(code, JSON.stringify({
            "testKey":"test",
            "key"    : "key"
        }));

        redisStoreJson.modifyValueByJsonKey(code,jsonKey,newValue)
            .then(() =>{
                getInformationByKey(client,code)
                    .then(data => {
                        except(data[jsonKey]).to.equal(newValue)
                        client.del(code); //cleanup
                    })
                    .catch( err => {
                        console.error("modif  "+err);
                        
                    })
            })
            .catch(err => {
                console.error(err);
            })
            

    })
        
})