import * as followService from "../services/FollowService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const follow = async (req: Request, res: Response) => {
  try {
    const existedFollow = await followService.checkAlreadyFollow(req.body.followerId, req.body.followingId);
    if (existedFollow) {
      return res.status(400).send("Already followed");
    }
    const follow = await followService.createFollow(req.body);
    res.json(follow);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const unfollow = await followService.createUnfollow(req.body);
    res.json(unfollow);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkFollow = async (req: Request, res: Response) => {
  const { followerId, users } = req.body;
  if (!followerId || !Array.isArray(users)) {
    return res.status(400).send("Invalid input");
  }

  try {
    const followingId = users.map((user) => user.id);
    const followStatuses = await followService.checkFollow(followerId, followingId);
    const followedIdsSet = new Set(followStatuses.map((follow) => follow.followingId));

    // Menyiapkan hasil respons dengan status follow untuk setiap pengguna
    const followStatusMap = users.map((user) => ({
      ...user,
      isFollowing: followedIdsSet.has(user.id),
    }));

    // Mengirimkan hasil sebagai JSON
    res.json(followStatusMap);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
