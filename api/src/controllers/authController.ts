import { Request, Response } from "express";
import { query } from "../db/database";
import { LoginRequest, SignupRequest, User, UserResponse } from "../types";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password }: SignupRequest = req.body;

    // Check if user already exists
    const existingUser = await query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user
    const result = await query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email, created_at",
      [name, username, email, hashedPassword]
    );

    const user: UserResponse = result.rows[0];

    // Generate token
    const token = generateToken(user.id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Find user
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user: User = result.rows[0];

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user.id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const getMe = async (req: any, res: Response) => {
  try {
    const result = await query(
      "SELECT id, name, username, email, created_at FROM users WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
