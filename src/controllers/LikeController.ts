import * as likeService from "../services/LikeService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const like = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);

  const { userId } = req.body;
  try {
    const like = await likeService.createLike({ postId, userId });
    res.json(like);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const unlike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);
  const { userId } = req.body;
  try {
    const unlike = await likeService.deleteLike({ postId, userId });
    res.json(unlike);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const countLike = async (req: Request, res: Response) => {
  try {
    const post = await likeService.countLike(parseInt(req.params.postId));
    const likesCount = post === null ? 0 : post.likes.length;
    res.json({ likes: likesCount });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkLike = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const postId = parseInt(req.params.postId, 10);
  try {
    const check = await likeService.checkLike({ postId, userId });
    if (check) {
      res.json({ liked: true });
    } else {
      res.json({ liked: false });
    }
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
