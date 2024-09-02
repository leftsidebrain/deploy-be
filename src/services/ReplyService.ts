import { Posts } from "@prisma/client";
import db from "../libs/db";
import { Ipost } from "../type/post";

export const findAll = async () => {
  return await db.posts.findMany({
    select: {
      content: true,
      id: true,
      author: {
        select: {
          username: true,
          email: true,
        },
      },
      comments: {
        select: {
          content: true,
          images: true,
        },
      },
      images: {
        select: {
          image: true,
        },
      },
    },
  });
};

export const findById = async (id: number) => {
  return await db.posts.findMany({
    where: { parentId: id },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          username: true,
          email: true,
          profile_pic: true,
        },
      },
      comments: {
        select: {
          content: true,
          images: true,
        },
      },
      images: {
        select: {
          image: true,
        },
      },
    },
  });
};
export const findOne = async (id: number) => {
  return await db.posts.findFirst({
    where: { id },
    select: {
      content: true,
      id: true,
      author: {
        select: {
          username: true,
          fullname: true,
          email: true,
          profile_pic: true,
        },
      },
      comments: {
        select: {
          content: true,
          images: true,
        },
      },
      images: {
        select: {
          image: true,
        },
      },
    },
  });
};

export const create = async (post: Ipost) => {
  const newPost = await db.posts.create({
    data: {
      ...post,
      images: {
        create: post.images && post.images.map((image) => ({ image: image })),
      },
    },
  });

  return newPost;
};

export const updatePosts = async (id: number, post: Posts) => {
  if (!(await db.posts.findFirst({ where: { id } }))) {
    return `Post ${id} not found`;
  }
  const updatedPost = await db.posts.update({ where: { id }, data: post });
  return updatedPost;
};

export const remove = async (id: number) => {
  if (!(await db.posts.findFirst({ where: { id } }))) {
    return `Post ${id} not found`;
  }
  await db.posts.delete({ where: { id } });

  return `Post ${id} has been deleted`;
};
