import { io, Socket } from "socket.io-client";
import { Poll, VoteData, CreatePollData } from "../types";

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(url: string = "http://localhost:5000") {
    if (this.socket?.connected) return;

    this.socket = io(url, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Listen to poll events
    this.socket.on("poll:started", (poll: Poll) => {
      this.emit("poll:started", poll);
    });

    this.socket.on("poll:updated", (poll: Poll) => {
      this.emit("poll:updated", poll);
    });

    this.socket.on("poll:ended", (poll: Poll) => {
      this.emit("poll:ended", poll);
    });

    this.socket.on("poll:error", (error: string) => {
      this.emit("poll:error", error);
    });

    this.socket.on("vote:error", (error: string) => {
      this.emit("vote:error", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Teacher actions
  createPoll(data: CreatePollData) {
    if (!this.socket) throw new Error("Socket not connected");
    this.socket.emit("teacher:createPoll", {
      ...data,
      startedAt: new Date(),
    });
  }

  endPoll(pollId: string) {
    if (!this.socket) throw new Error("Socket not connected");
    this.socket.emit("teacher:endPoll", pollId);
  }

  // Student actions
  submitVote(data: VoteData) {
    if (!this.socket) throw new Error("Socket not connected");
    this.socket.emit("student:vote", data);
  }

  // Event listener management
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data));
    }
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
