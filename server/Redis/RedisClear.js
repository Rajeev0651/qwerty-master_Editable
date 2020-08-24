const data = require("../Redis/data");

(async () => {
  console.log(data.key);
  var client = await data.key[0];
  console.log(client);
  //client.flushall("ASYNC", callback);
})();
