const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const socketio = require("socket.io");
const fs = require("fs");
const cors = require("cors");
const app = express();
const https = require("https");
const SocketInitialize = require("./Socket/InitializeSocket");
app.use(cookieparser());
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(express.json());
const loginRoute = require("./routers/login");
const signupRoute = require("./routers/signup");
const homeRoute = require("./routers/home");
const logoutRoute = require("./routers/logout");
const CreateTopic = require("./routers/CreateTopic");
const FeedRequest = require("./routers/FeedRequests");
const ChatBoxPageRequest = require("./routers/ChatBox");
const redisID = require("./Redis/data");
const clientdata = require("./routers/ClientData");
const Redis = require("./Redis/initializeRedis");
const ContentResponse = require("./routers/ContentResponse");
const redisContentUpdate = require("./Redis/CRUD");

dotenv.config();
const uri = process.env.ATLAS_URI;

const options = {
  key: fs.readFileSync("../SSL/privatekey.pem"),
  cert: fs.readFileSync("../SSL/certificate.pem"),
};

async function DatabaseConnection() {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", () => {
      console.log("connection established");
    });
  } catch (err) {
    console.log(err);
  }
}
function RedisConnection() {
  var client = Redis.RedisClient();
  redisID.insert(client);
}
DatabaseConnection();
RedisConnection();

app.use(clientdata);
app.use(homeRoute);
app.use(loginRoute);
app.use(signupRoute);
app.use(logoutRoute);
app.use(FeedRequest);
app.use(ChatBoxPageRequest);
app.use(ContentResponse);
app.use(CreateTopic);
function add()
{
  return 1
}
redisContentUpdate.RedisContentTimer()
//app.use(CreateSocket);
const PORT = process.env.PORT || 5000;
const server = https.createServer(options, app).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const io = socketio(server);
SocketInitialize.SocketInitialize(io);
//console.log(client);
