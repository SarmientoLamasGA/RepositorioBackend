const app = require("./src/app");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set("socketio", io);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});

io.on("connection", async (socket) => {
  app.set("socket", socket);
});
