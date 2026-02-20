import { Router } from "express";
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController
} from "./task-controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect);


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Finish assignment
 *             description: Submit before deadline
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/", createTaskController);


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks (user sees own, admin sees all)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasksController);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task (owner or admin)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated title
 *             description: Updated description
 *             completed: true
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id", updateTaskController);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task (owner)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", deleteTaskController);

export default router;