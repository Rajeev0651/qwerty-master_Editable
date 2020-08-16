const {promisify} = require('util');


/**
 * 
 * @param {*} redis 
 * @param {*} key 
 */
const entryExist = (redis, key) => {
    const getAsync = promisify(redis.get).bind(redis);

    return new Promise((resolve, reject) => {
        getAsync(key)
            .then((data) =>{
                resolve (true); 
            })
            .catch((errMsg) =>{
                reject("[redis-store-JSON] Key don't exist in redis store") ;
            })
    })

}

module.exports = entryExist;