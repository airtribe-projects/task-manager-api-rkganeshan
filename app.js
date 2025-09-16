const express = require("express");
const { json, urlencoded } = require("express");
const tasksRouter = require("./routes/index.js");
const { loadData } = require("./data/index.js");

const app = express();
const port = 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Load initial data
loadData();

// Routes
app.use("/api/tasks", tasksRouter);

// Start server
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
