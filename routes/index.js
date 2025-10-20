const { Router } = require("express");
const {
  getAllTasks,
  getTaskById,
  getTasksByPriority,
} = require("../controllers/queries.js");
const {
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/commands.js");

const router = Router();

// Queries - GET
router.get("/", getAllTasks);

router.get("/priority/:level", getTasksByPriority);

router.get("/:id", getTaskById);

// Commands - POST, PUT, DELETE
router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
