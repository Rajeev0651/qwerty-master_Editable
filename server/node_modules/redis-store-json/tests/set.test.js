const chai = require('chai')
const except = chai.expect
const redis = require('redis');
const client = redis.createClient();
const redisStoreJson = require('..');
const getInformationByKey = require('../actions/getInformationByKey')


describe('set',()=>{
    it('set should correctly set the object',()=>{
        let code = "ACBD";

        redisStoreJson.use(client);

        const ob = {
            "test"  : "test" ,
            "test1" : 0      ,
            "test2" : {
                "test" : "a",
                "test1" : 0
            },
            "test3" : [0,1,2]
            
        }

        redisStoreJson.set(code,ob)
            .then(() => {
                getInformationByKey(client, code)
                    .then(data => {
                        except(data).to.eql(ob);
                        client.del(code)
                    })
                
            })
            .catch(err => {
                console.log("should happen");
                
            })
            
    })
   
        
})