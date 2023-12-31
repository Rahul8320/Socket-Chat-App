import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { configDotenv } from "dotenv";

// load environment variables
configDotenv();

// Initialize express app and http server
const app = express();
const server = createServer(app);
const io = new Server(server);

// Initial port from environment variables
const PORT = process.env.PORT || 3000;

// Root folder directory
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views/index.html"));
});

// socket connection
io.on("connection", (socket) => {
  // Broadcasting welcome message for all connected clients.
  io.emit("hello", `Hello, ${socket.id}, Welcome to this chat room!`);

  // Listen any socket event emits and log this to console.
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  // listen for chat messages
  socket.on("chat message", (msg) => {
    // emits chat messages
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`⚙️ server running at http://localhost:${PORT}`);
});
