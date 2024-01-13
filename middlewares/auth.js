import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const verifyToken = (authorization) => {
  let token = "";
  let decodedToken = {};

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
    decodedToken = jwt.verify(token, config.jwtSecret);
  }

  return { token, decodedToken };
};

function checkAdminRole(req, res, next) {
  const { token, decodedToken } = verifyToken(req.get("authorization"));

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  if (decodedToken.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

function checkLogin(req, res, next) {
  const { token, decodedToken } = verifyToken(req.get("authorization"));

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid User" });
  }

  next();
}

export { checkAdminRole, checkLogin };
