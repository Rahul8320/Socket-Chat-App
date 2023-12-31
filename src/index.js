import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Load environment variables
dotenv.config();

// Create express app and http server
const app = express();
const server = createServer(app);

// Get server port from environment
const PORT = process.env.PORT || 3000;

// get path of root directory
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.status(200).sendFile(join(__dirname, "./views/index.html"));
});

app.listen(PORT, () => {
  console.log(` ⚙️ Server listening at http://localhost:${PORT}`);
});
