import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  getTasksByPriority,
} from "../controllers/queries.js";
import { createTask, deleteTask, updateTask } from "../controllers/commands.js";

const router = Router();

// Queries - GET
router.get("/", getAllTasks);

router.get("/priority/:level", getTasksByPriority);

router.get("/:id", getTaskById);

// Commands - POST, PUT, DELETE
router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
