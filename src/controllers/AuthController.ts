import * as authService from "../services/AuthService";
import { Request, Response } from "express";
import { IUserRegister } from "../type/auth";
import errorHandler from "../utils/errorHandler";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      token: user,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body as IUserRegister);
    res.json({
      response: "success",
      message: "Register success",
      data: user,
    });
  } catch (error) {
    console.log(error);

    errorHandler(res, error as unknown as Error);
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    res.json({
      message: "User authenticated successfully",
      data: {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic,
        id: user.id,
        banner: user.banner,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.log(error);

    errorHandler(res, error as unknown as Error);
  }
};
