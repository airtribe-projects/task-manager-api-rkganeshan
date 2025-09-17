const { getData } = require("../data");
const { parseBoolean } = require("../helpers");

const ERROR_TASK_NOT_FOUND = "Task not found";

// GET /tasks - Retrieve all tasks (supports filtering & sorting)
const getAllTasks = (req, res) => {
  const { completed, sortBy, order } = req.query;
  let tasks = getData()?.tasks || [];

  // Filter by completion status
  if (completed !== undefined) {
    const boolCompleted = parseBoolean(completed);
    if (boolCompleted === undefined && completed !== undefined) {
      return res
        .status(400)
        .json({ message: "`completed` must be 'true' or 'false'" });
    }
    tasks = tasks.filter((t) => t.completed === boolCompleted);
  }

  // Sorting
  if (sortBy === "date") {
    const validOrders = ["asc", "desc"];
    const sortOrder = order || "asc";
    if (!validOrders.includes(sortOrder)) {
      return res
        .status(400)
        .json({ message: "`order` must be 'asc' or 'desc'" });
    }
    tasks.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? bDate - aDate : aDate - bDate;
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
    return res.status(404).json({ message: ERROR_TASK_NOT_FOUND });
  }
  res.json(task);
};

// GET /tasks/priority/:level - Retrieve tasks by priority
const getTasksByPriority = (req, res) => {
  let { level } = req.params;
  level = typeof level === "string" ? level.toLowerCase() : level;
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
