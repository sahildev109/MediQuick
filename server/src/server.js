import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db.js";
import app from "./app.js";
import { initSocket } from "./socket.js";

dotenv.config();

connectDB();
const server = http.createServer(app);
// 🔥 Initialize socket
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
