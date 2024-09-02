import { countFollow } from "./../services/UserService";
import * as userService from "../services/UserService";
import { Request, Response } from "express";

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll(req.body.userId);
    if (!users) {
      return res.send({
        response: "fail",
        message: "user not found",
      });
    }

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
export const findInput = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const users = await userService.findSearch(query);
    if (!users) {
      return res.send({
        response: "fail",
        message: "user not found",
      });
    }

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const findById = async (req: Request, res: Response) => {
  const user = await userService.findById(parseInt(req.params.id));
  if (!user) {
    return res.send({
      response: "fail",
      message: "data tidak ditemukan",
    });
  }
  res.json(user);
};

export const update = async (req: Request, res: Response) => {
  if (res.locals.image) {
    req.body.profile_pic = res.locals.image;
  }
  const user = await userService.updateUser(parseInt(req.params.id), req.body);
  res.json(user);
};

export const remove = async (req: Request, res: Response) => {
  try {
    const user = await userService.remove(parseInt(req.params.id));
    if (!user) {
      return res.send({
        response: "fail",
        message: "data tidak ditemukan",
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const countFoll = async (req: Request, res: Response) => {
  try {
    const count = await countFollow(parseInt(req.params.id));
    if (!count) {
      return res.send({
        response: "fail",
        message: "data tidak ditemukan",
      });
    }

    res.json({ followers: count.followers.length, following: count.following.length });
  } catch (error) {
    console.log(error);
  }
};

export const userFollowing = async (req: Request, res: Response) => {
  const count = await userService.listFollowing(parseInt(req.params.id));
  res.json(count);
};
export const userFollower = async (req: Request, res: Response) => {
  const count = await userService.listFollower(parseInt(req.params.id));
  res.json(count);
};
