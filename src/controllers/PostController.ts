import { postSchema } from "../libs/validation/post";
import * as postService from "../services/PostService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findAll();
    if (!posts) {
      return res.send({
        response: "fail",
        message: "post not found",
      });
    }

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const findAllUser = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findAllUser(parseInt(req.params.id));
    if (!posts) {
      return res.send({
        response: "fail",
        message: "post not found",
      });
    }

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const findById = async (req: Request, res: Response) => {
  const post = await postService.findById(parseInt(req.params.id));
  if (!post) {
    return res.send({
      response: "fail",
      message: "data tidak ditemukan",
    });
  }
  res.json(post);
};
export const findByOne = async (req: Request, res: Response) => {
  const post = await postService.findOne(parseInt(req.params.id));
  if (!post) {
    return res.send({
      response: "fail",
      message: "data tidak ditemukan",
    });
  }
  res.json(post);
};

export const create = async (req: Request, res: Response) => {
  try {
    await postSchema.validateAsync(req.body);
    console.log("🚀 ~ create ~ res.locals.images:", res.locals.images);

    if (res.locals.images) {
      req.body.images = res.locals.images;
    }

    const userId = res.locals.user.id;
    req.body.userId = userId;

    const post = await postService.create(req.body);
    res.json({
      response: "succsess",
      message: "create success",
      data: post,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const update = async (req: Request, res: Response) => {
  const post = await postService.updatePosts(parseInt(req.params.id), req.body);
  res.json(post);
};

export const remove = async (req: Request, res: Response) => {
  try {
    const post = await postService.remove(parseInt(req.params.id));
    if (!post) {
      return res.send({
        response: "fail",
        message: "data tidak ditemukan",
      });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
