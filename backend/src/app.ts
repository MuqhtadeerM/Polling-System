import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes";
import { createPoll, getActivePoll } from "./controller/poll.controller";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Server is working");
});



// get active polls
// app.get("/active", getActivePoll);

// Poll APIs
app.use("/api/poll", pollRoutes);

export default app;
