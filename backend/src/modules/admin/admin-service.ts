import { prisma } from "../../lib/prisma";

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

export const deleteUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.delete({
    where: { id: userId }
  });
};

export const changeUserRoleService = async (
  userId: string,
  role: "USER" | "ADMIN"
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role }
  });
};

export const getAllTasksAdminService = async () => {
  return prisma.task.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

export const adminAssignTaskService = async (
  userId: string,
  title: string,
  description?: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) throw new Error("User not found");

  return prisma.task.create({
    data: {
      title,
      description,
      userId
    }
  });
};

export const adminDeleteAnyTaskService = async (taskId: string) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) throw new Error("Task not found");

  return prisma.task.delete({
    where: { id: taskId }
  });
};
export const adminUpdateAnyTaskService = async (
  taskId: string,
  data: any
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) throw new Error("Task not found");

  return prisma.task.update({
    where: { id: taskId },
    data
  });
};