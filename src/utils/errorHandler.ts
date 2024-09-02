import { Response } from "express";
import ERROR_CODE from "./constant/ERROR_CODE";
import ERROR_MESSAGE from "./constant/ERROR_MESSAGE";

const errorHandler = (res: Response, err: Error) => {
  let message = err.message;

  return res.status(ERROR_CODE[message] || 500).json({ error: ERROR_MESSAGE[message] || message });
};
export default errorHandler;
