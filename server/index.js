import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new user connected: ", socket.id);

  socket.on("message", (message) => {
    socket.broadcast.emit("receive_message", message);
  });
});

server.listen(port, () => {
  console.log("Server is running. PORT:" + port);
});
