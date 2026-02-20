import { Request, Response } from "express";
import {
  createTaskService,
  getUserTasksService,
  updateTaskService,
  deleteTaskService
} from "./task-service";
import { createTaskSchema, updateTaskSchema } from "./task-validation";
import { asyncHandler } from "../../lib/async-handler";


export const createTaskController = asyncHandler(async (req: any, res: Response) => {
  const data = createTaskSchema.parse(req.body);

  const task = await createTaskService(
    req.user.userId,
    data.title,
    data.description
  );

  res.status(201).json(task);
});


export const getTasksController = asyncHandler(async (req: any, res: Response) => {
  const tasks = await getUserTasksService(req.user.userId);
  res.json(tasks);
});


export const updateTaskController = asyncHandler(async (req: any, res: Response) => {
  const data = updateTaskSchema.parse(req.body);

  const task = await updateTaskService(
    req.params.id,
    req.user.userId,
    data
  );

  res.json(task);
});


export const deleteTaskController = asyncHandler(async (req: any, res: Response) => {
  await deleteTaskService(
    req.params.id,
    req.user.userId,
  );

  res.json({ message: "Task deleted" });
});