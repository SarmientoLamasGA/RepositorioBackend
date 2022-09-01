const app = require("./src/app");
// const config = require("./config/config");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const options = require("./src/utils/minimist.options");
const cluster = require("cluster");
const numCPU = require("os").cpus().length;
const ChatService = require("./src/services/cart.service");
const chatDB = new ChatService();

if (options.mode == "cluster") {
  if (cluster.isMaster) {
    for (i = 0; i < numCPU; i++) {
      cluster.fork();
    }
  }
  if (cluster.isWorker) {
    httpServer.listen(process.env.PORT || options.port, () => {
      console.log(`Servidor funcionando en puerto ${options.port}`);
    });

    io.on("connection", async (socket) => {
      io.sockets.emit("requestChat", await chatDB.getById());
      socket.on("newMessage", async (message) => {
        await chatDB.sendMessage(UId, message);
        io.sockets.emit("messages", { data: await chatDB.getById(UId) });
      });
    });
  }
} else {
  httpServer.listen(process.env.PORT || options.port, () => {
    console.log(`Servidor funcionando en puerto ${options.port}`);
  });

  io.on("connection", async (socket) => {
    io.sockets.emit("requestChat", await chatDB.getAll());
    socket.on("newMessage", async (message) => {
      await chatDB.sendMessage();
      io.sockets.emit("messages", { data: await chatDB.getById() });
    });
  });
}
