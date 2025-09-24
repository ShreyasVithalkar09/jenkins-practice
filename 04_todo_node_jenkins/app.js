import express from "express";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Basic health route
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running!" });
});

export default app;
