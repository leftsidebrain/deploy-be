import { postSchema } from "../libs/validation/post";
import * as replyService from "../services/ReplyService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  try {
    const posts = await replyService.findAll();
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
  const post = await replyService.findById(parseInt(req.params.id));
  if (!post) {
    return res.send({
      response: "fail",
      message: "data tidak ditemukan",
    });
  }
  res.json(post);
};

export const findByOne = async (req: Request, res: Response) => {
  const post = await replyService.findOne(parseInt(req.params.id));
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

    if (req.files) {
      req.body.images = req.files;
    }
    const postId = parseInt(req.params.post_id);
    const userId = res.locals.user.id;
    req.body.userId = userId;
    req.body.parentId = postId;

    const post = await replyService.create(req.body);
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
  const post = await replyService.updatePosts(parseInt(req.params.id), req.body);
  res.json(post);
};

export const remove = async (req: Request, res: Response) => {
  try {
    const post = await replyService.remove(parseInt(req.params.id));
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
