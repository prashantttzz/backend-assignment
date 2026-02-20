import { Router } from "express";
import { registerController, loginController } from "./auth-controller";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Prashant
 *             email: test@test.com
 *             password: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerController);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: test@test.com
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginController);

export default router;