import { Posts } from "@prisma/client";

export interface Ipost extends Posts {
  images: Express.Multer.File[];
}
