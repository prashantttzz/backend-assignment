import { Request, Response } from "express";
import { loginUserService, registerUserService } from "./auth-service";
import { loginSchema, registerSchema } from "./auth-validation";
import { asyncHandler } from "../../lib/async-handler";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const result = await registerUserService(
      data.name,
      data.email,
      data.password,
    );

    res.status(201).json(result);
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const result = await loginUserService(data.email, data.password);

    res.status(200).json(result);
  },
);
