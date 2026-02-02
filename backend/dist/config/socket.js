"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const poll_socket_1 = require("../sockets/poll.socket");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);
        // this will register all polls to new users
        (0, poll_socket_1.pollSocketHandler)(io, socket);
        socket.on("disconnext", () => {
            console.log("socket failed to connect", socket.id);
        });
    });
};
exports.initSocket = initSocket;
