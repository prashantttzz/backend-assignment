import { Router } from "express";
import {
  getAllUsersController,
  deleteUserController,
  changeUserRoleController,
  getAllTasksAdminController,
  adminAssignTaskController,
  adminDeleteAnyTaskController,
  adminUpdateAnyTaskController
} from "./admin-controller";
import { protect, restrictTo } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect, restrictTo("ADMIN"));

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", getAllUsersController);


/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/users/:id", deleteUserController);


/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Change user role (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             role: ADMIN
 *     responses:
 *       200:
 *         description: Role updated
 */
router.patch("/users/:id/role", changeUserRoleController);


/**
 * @swagger
 * /admin/tasks:
 *   get:
 *     summary: Get all tasks (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 */
router.get("/tasks", getAllTasksAdminController);


/**
 * @swagger
 * /admin/assign-task:
 *   post:
 *     summary: Assign a task to any user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: USER_ID_HERE
 *             title: Complete report
 *             description: Submit by Monday
 *     responses:
 *       201:
 *         description: Task assigned
 */
router.post("/assign-task", adminAssignTaskController);


/**
 * @swagger
 * /admin/tasks/{taskId}:
 *   delete:
 *     summary: Delete any task (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/tasks/:taskId", adminDeleteAnyTaskController);


/**
 * @swagger
 * /admin/tasks/{taskId}:
 *   put:
 *     summary: Update any task (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated by admin
 *             completed: true
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/tasks/:taskId", adminUpdateAnyTaskController);

export default router;