import { Request, Response } from "express";
import {
  getAllUsersService,
  deleteUserService,
  changeUserRoleService,
  getAllTasksAdminService,
  adminAssignTaskService,
  adminDeleteAnyTaskService,
  adminUpdateAnyTaskService
} from "./admin-service";
import { asyncHandler } from "../../lib/async-handler";

// get all users
export const getAllUsersController = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.json(users);
});


// delete any user
export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserService(id as string);

  res.json({ message: "User deleted by admin" });
});


//  change role (USER ↔ ADMIN)
export const changeUserRoleController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await changeUserRoleService(id as string, role);

  res.json(user);
});


//  get all tasks
export const getAllTasksAdminController = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await getAllTasksAdminService();
  res.json(tasks);
});


//  assign task to any user
export const adminAssignTaskController = asyncHandler(async (req: Request, res: Response) => {
  const { userId, title, description } = req.body;

  const task = await adminAssignTaskService(userId, title, description);

  res.status(201).json(task);
});


// delete any task
export const adminDeleteAnyTaskController = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;

  await adminDeleteAnyTaskService(taskId as string);

  res.json({ message: "Task deleted by admin" });
});


// update any task (very useful)
export const adminUpdateAnyTaskController = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const data = req.body;

  const task = await adminUpdateAnyTaskService(taskId as string, data);

  res.json(task);
});