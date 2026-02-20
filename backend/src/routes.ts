import { Router } from "express";
import authRoutes from "./modules/auth/auth-routes";
import taskRoutes from "./modules/task/task-routes";
import adminRoutes from "./modules/admin/admin-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/admin", adminRoutes);

export default router;