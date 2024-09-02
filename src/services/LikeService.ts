import db from "../libs/db";
import { ILike } from "../type/like";

export const createLike = async (body: ILike) => {
  const checkLike = await db.like.findFirst({
    where: {
      postId: body.postId,
      userId: body.userId,
    },
  });

  if (checkLike) {
    return "User already liked this post";
  }

  const like = await db.like.create({
    data: body,
  });

  return like;
};
export const deleteLike = async (body: ILike) => {
  const existingLike = await db.like.findFirst({
    where: {
      postId: body.postId,
      userId: body.userId,
    },
  });
  if (!existingLike) {
    return "User has not liked this post";
  }

  await db.like.delete({
    where: {
      id: existingLike.id,
    },
  });

  return "unlike success";
};

export const countLike = async (postId: number) => {
  const res = await db.posts.findUnique({
    where: {
      id: postId,
    },
    include: {
      likes: true,
    },
  });
  return res;
};

export const checkLike = async (body: ILike) => {
  const exsintinglike = await db.like.findFirst({
    where: {
      postId: body.postId,
      userId: body.userId,
    },
  });

  if (exsintinglike) {
    return true;
  } else {
    return false;
  }
};
