const chai = require('chai')
const except = chai.expect
const redis = require('redis');
const client = redis.createClient();
const entryExist = require('../helpers/entryExist');


describe('entryExist',()=>{
    it('entryExist should return true',()=>{
        let code = "ABCDE";
        client.set(code, JSON.stringify({}))
        entryExist(client, code)
            .then(data => {
                except(data).to.equal(true);
                 //cleanup
                client.del(code)
            })
            .catch(() => {
                console.log("error");
            })
       
    })
   
})