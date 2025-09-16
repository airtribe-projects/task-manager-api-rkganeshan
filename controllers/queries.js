const { getData } = require("../data");

// GET /tasks - Retrieve all tasks (supports filtering & sorting)
const getAllTasks = (req, res) => {
  const { completed, sortBy, order } = req.query;
  let tasks = getData()?.tasks || [];

  // Filter by completion status
  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ message: "`completed` must be 'true' or 'false'" });
    }
    const boolCompleted = completed === "true";
    tasks = tasks.filter((t) => t.completed === boolCompleted);
  }

  // Sorting
  if (sortBy === "date") {
    tasks.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return order === "desc" ? bDate - aDate : aDate - bDate;
    });
  }

  res.json(tasks);
};

// GET /tasks/:id - Retrieve a task by ID
const getTaskById = (req, res) => {
  const tasks = getData()?.tasks || [];
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

// GET /tasks/priority/:level - Retrieve tasks by priority
const getTasksByPriority = (req, res) => {
  const { level } = req.params;
  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(level)) {
    return res.status(400).json({
      message: "Invalid priority level. Use: low, medium, high",
    });
  }

  const tasks = getData()?.tasks || [];
  const filtered = tasks.filter((t) => t.priority === level);
  res.json(filtered);
};

module.exports = { getAllTasks, getTaskById, getTasksByPriority };
