import db from "../libs/db";
import { IFollow } from "../type/follow";

export const createFollow = async (body: IFollow) => {
  const follow = await db.follows.create({
    data: body,
  });

  return follow;
};
export const createUnfollow = async (body: IFollow) => {
  const unfollow = await db.follows.deleteMany({
    where: {
      followerId: body.followerId,
      followingId: body.followingId,
    },
  });

  return unfollow;
};

export const checkAlreadyFollow = async (followerId: number, followingId: number) => {
  const res = await db.follows.findFirst({
    where: {
      followerId,
      followingId,
    },
  });
  return res;
};

export const checkFollow = async (followerId: number, followingId: number[]) => {
  const follow = await db.follows.findMany({
    where: {
      followerId,
      followingId: {
        in: followingId,
      },
    },
    select: {
      followingId: true,
    },
  });
  return follow;
};
