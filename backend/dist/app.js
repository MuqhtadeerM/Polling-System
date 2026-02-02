"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const poll_routes_1 = __importDefault(require("./routes/poll.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get("/", (req, res) => {
    res.send("Server is working");
});
// get active polls
// app.get("/active", getActivePoll);
// Poll APIs
app.use("/api/poll", poll_routes_1.default);
exports.default = app;
