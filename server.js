const app = require("./src/app");
// const config = require("./config/config");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = require("./utils/minimist.port");
// const { stderr, stdout } = require("process");
// const { exec } = require("node:child_process");

// exec("shell ls -lh", (error, stderr, stdout) => {
//   if (error) {
//     console.error(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`error: ${stderr.message}`);
//     return;
//   }
//   console.log(`stdout:\n${stdout}`);
// });
// // console.log(process);

app.set("socketio", io);

console.log(port);

httpServer.listen(port, () => {
  console.log(`Servidor funcionando en puerto ${port}`);
});

io.on("connection", async (socket) => {
  app.set("socket", socket);
});
