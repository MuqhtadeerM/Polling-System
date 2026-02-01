import app from "./app";
import http from "http";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { initSocket } from "./config/socket";

dotenv.config();

// connect DB first
connectDB();

// create HTTP server
const server = http.createServer(app);

// init socket on same server
initSocket(server);

const PORT = process.env.PORT;

// START THE HTTP SERVER (not app.listen)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
