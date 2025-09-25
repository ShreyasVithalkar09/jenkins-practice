import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import todoRoutes from "./routes/todoRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 👇 set ejs as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/todos", todoRoutes);

// Frontend route - renders HTML with todos
import { getTodosData } from "./controllers/todoController.js";

app.get("/", (req, res) => {
  const todos = getTodosData(); // new helper to just return array
  res.render("index", { todos });
});

export default app;
