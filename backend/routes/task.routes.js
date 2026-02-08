import express from "express";
import {
  createTask,
  getTasks,
  deleteTask,
} from "../controllers/task.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.delete("/:id", auth, role("admin"), deleteTask);

export default router;
