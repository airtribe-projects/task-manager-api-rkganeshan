const { getData, saveData } = require("../data");

// POST /tasks - Create a new task
const createTask = async (req, res) => {
  const { title, description, completed, priority } = req.body;
  console.log("body details, title:", title, "description:", description);
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (completed === undefined) missingFields.push("completed");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Missing required fields", fields: missingFields });
  }

  // Validate completed type
  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "`completed` must be a boolean (true/false)" });
  }

  // Validate priority (optional, default = low)
  const validPriorities = ["low", "medium", "high"];
  let finalPriority = "low"; // default
  if (priority !== undefined) {
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        message: "`priority` must be one of: low, medium, high",
      });
    }
    finalPriority = priority;
  }

  const data = await getData();
  const tasks = data?.tasks || [];

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    completed,
    priority: finalPriority,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await saveData({ tasks });
  res.status(201).json(newTask);
};

// PUT /tasks/:id - Update a task by ID
const updateTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await getData();
  const tasks = data?.tasks ?? [];
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const existing = tasks[taskIndex];
  const body = req.body ?? {};
  const updatedTask = { ...existing };

  if ("title" in body) updatedTask.title = body.title;
  if ("description" in body) updatedTask.description = body.description;

  if ("completed" in body) {
    if (typeof body.completed !== "boolean") {
      return res
        .status(400)
        .json({ message: "`completed` must be a boolean (true/false)" });
    }
    updatedTask.completed = body.completed;
  }

  if ("priority" in body) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(body.priority)) {
      return res.status(400).json({
        message: "`priority` must be one of: low, medium, high",
      });
    }
    updatedTask.priority = body.priority;
  }

  tasks[taskIndex] = updatedTask;
  await saveData({ tasks });

  return res.json(updatedTask);
};

// DELETE /tasks/:id - Delete a task by ID
const deleteTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = await getData();
  const tasks = data?.tasks || [];

  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  await saveData({ tasks });
  res.json({ message: "Task deleted" });
};

module.exports = { createTask, updateTask, deleteTask };
