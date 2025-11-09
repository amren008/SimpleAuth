import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Signup validation schema
const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name is too long")
    .trim(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

// Login validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  password: z.string().min(1, "Password is required"),
});

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    req.body = validatedData; // Replace with validated/sanitized data
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    req.body = validatedData; // Replace with validated/sanitized data
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
    next(error);
  }
};
