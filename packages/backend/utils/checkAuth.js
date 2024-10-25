import jwt from "jsonwebtoken";
import { UserService } from "../prisma/UserService.js";

export const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.user = undefined;
    return next();
  }

  if (token) {
    const decoded = jwt.verify(token, `someone`);
    const user = await UserService.findUserById({ id: decoded.id });
    req.user = user;
    return next();
  }
};
