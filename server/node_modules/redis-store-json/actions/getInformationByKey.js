const {promisify} = require('util');


const getInformationByKey = (redis, key) =>{
    return new Promise((resolve, reject) => {
        const getAsync = promisify(redis.get).bind(redis);

        getAsync(key)
            .then(data => {
                try{
                    let parsed = JSON.parse(data);
                    resolve(parsed)
                }catch(e) {
                    reject('[redis-store-JSON] value stored are not json')
                }
                

            })
            .catch(err => {

                reject(`[redis-store-JSON] no redis key found for ${key}`)
                
            })
    })
    
}


module.exports = getInformationByKey;