"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./config/socket");
dotenv_1.default.config();
// connect DB first
(0, db_1.connectDB)();
// create HTTP server
const server = http_1.default.createServer(app_1.default);
// init socket on same server
(0, socket_1.initSocket)(server);
const PORT = process.env.PORT;
// START THE HTTP SERVER (not app.listen)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
