const app = require("./src/app");
// const config = require("./config/config");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const options = require("./src/utils/minimist.options");
const cluster = require("cluster");
const numCPU = require("os").cpus().length;

if (options.mode == "cluster") {
  if (cluster.isMaster) {
    console.log("Modo cluster");
    for (i = 0; i < numCPU; i++) {
      cluster.fork();
    }
  }
  if (cluster.isWorker) {
    httpServer.listen(process.env.PORT || options.port, () => {
      console.log(`Servidor funcionando en puerto ${options.port}`);
    });

    io.on("connection", async (socket) => {
      app.set("socket", socket);
    });
  }
} else {
  httpServer.listen(process.env.PORT || options.port, () => {
    console.log(`Servidor funcionando en puerto ${options.port}`);
  });

  io.on("connection", async (socket) => {
    app.set("socket", socket);
  });
}
