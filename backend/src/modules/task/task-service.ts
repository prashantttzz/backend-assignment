import { prisma } from "../../lib/prisma";

export const createTaskService = async (
  userId: string,
  title: string,
  description?: string,
) => {
  return prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export const getUserTasksService = async (userId: string) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTaskService = async (
  taskId: string,
  userId: string,
  data: any,
) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  if (task.userId !== userId ) {
    throw new Error("Not allowed");
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTaskService = async (
  taskId: string,
  userId: string,
) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  if (task.userId !== userId) {
    throw new Error("Not allowed");
  }

  return prisma.task.delete({ where: { id: taskId } });
};
