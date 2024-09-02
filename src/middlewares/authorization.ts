import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  const pyload = jwt.verify(token, process.env.SECRET_KEY || "secret");
  if (!pyload) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  res.locals.user = pyload;
  next();
}
