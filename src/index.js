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

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`⚙️ server running at http://localhost:${PORT}`);
});
