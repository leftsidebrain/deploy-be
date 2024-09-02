import express from "express";
import dotenv from "dotenv";
import route from "./src/routes";
import db from "./src/libs/db";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use(cors());

app.use(route);

app.listen(port, async () => {
  try {
    await db.$connect();
    console.log("running on port " + port);
  } catch (error) {
    await db.$disconnect();
    console.log(error);
  }
});
