import { Server } from "socket.io";
import http from "http";
import { pollSocketHandler } from "../sockets/poll.socket";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    // this will register all polls to new users
    pollSocketHandler(io, socket);
    
    socket.on("disconnext", () => {
      console.log("socket failed to connect", socket.id);
    });
  });
};
