const app = require("./src/app");
// const config = require("./config/config");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = require("./utils/minimist.port");

app.set("socketio", io);

console.log(port);

httpServer.listen(port, () => {
  console.log(`Servidor funcionando en puerto ${port}`);
});

io.on("connection", async (socket) => {
  app.set("socket", socket);
});
