const chai = require('chai')
const except = chai.expect
const redis = require('redis');
const client = redis.createClient();
const redisStoreJson = require('..');
const getInformationByKey = require('../actions/getInformationByKey')


describe('hasJSONkey()', () => {

    it('hasJSONkey() should return true', () => {
        let code = "testJsonKeytrue";
        let jsonKey = "testKey";
        let json = {
            "testKey": "test",
            "key": "key"
        };

        redisStoreJson.use(client);

        redisStoreJson.set(code, json)
            .then(() => {
                redisStoreJson.hasJSONkey(code, jsonKey)
                    .then((data) => {
                        except(data).to.equal(true);
                        //cleanup
                        client.del(code);
                    })
                    .catch(err => {
                        console.log("err1"+err);

                    })
            })

    })
    it('hasJSONKey.test() should return false', () => {
        let code = "testJsonKeyfalse";
        let jsonKey = "testKey";
        let json = {
            "testKey": "test",
            "key": "key"
        };

        redisStoreJson.use(client);

        redisStoreJson.set(code, json)
            .then(() => {
                redisStoreJson.hasJSONkey(code, "jsonKey")
                    .then((data) => {
                        except(data).to.equal(false);
                        //cleanup
                        client.del(code);
                    })
                    .catch(err => {
                        console.log("err2"+err);

                    })
            })


    })

})