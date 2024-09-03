import { User } from "@prisma/client";
import db from "../libs/db";

export const findAll = async (userId: number) => {
  return await db.user.findMany({
    where: {
      NOT: { id: userId },
    },
    select: {
      id: true,
      username: true,
      profile_pic: true,
      fullname: true,
      banner: true,
      bio: true,
    },
  });
};
export const findSearch = async (query: any) => {
  return await db.user.findMany({
    where: {
      username : {
        startsWith: query,
        mode: "insensitive",
      },
    },

    select: {
      id: true,
      username: true,
      profile_pic: true,
      fullname: true,
      banner: true,
      bio: true,
    },
  });
};

export const findById = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
    select: {
      id: true,
      username: true,
      profile_pic: true,
      fullname: true,
      banner: true,
      bio: true,
    },
  });
};

export const listFollower = async (id: number) => {
  const res = await db.follows.findMany({
    where: { followingId: id },
    include: {
      follower: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
          fullname: true,
        },
      },
    },
  });
  return res;
};
export const listFollowing = async (id: number) => {
  const res = await db.follows.findMany({
    where: { followerId: id },
    include: {
      following: {
        select: {
          username: true,
          profile_pic: true,
          fullname: true,
        },
      },
    },
  });
  return res;
};

export const updateUser = async (id: number, user: User) => {
  if (!(await db.user.findFirst({ where: { id } }))) {
    return `User ${id} not found`;
  }
  const updatedUser = await db.user.update({ where: { id }, data: user });
  return updatedUser;
};

export const remove = async (id: number) => {
  if (!(await db.user.findFirst({ where: { id } }))) {
    return `User ${id} not found`;
  }
  await db.user.delete({ where: { id } });

  return `User ${id} has been deleted`;
};

export const countFollow = async (id: number) => {
  const res = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      followers: true,
      following: true,
    },
  });
  return res;
};
