import express, { json, urlencoded } from "express";
import tasksRouter from "./routes/index.js";
import { loadData } from "./data/index.js";

const app = express();
const port = 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Load initial data
await loadData();

// Routes
app.use("/api/tasks", tasksRouter);

// Start server
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

export default app;
