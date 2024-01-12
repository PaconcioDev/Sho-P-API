import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

function checkAdminRole(req, res, next) {
  const authorization = req.get("authorization");
  let token = "";
  let decodedToken = {};

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
    decodedToken = jwt.verify(token, config.jwtSecret);
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  if (decodedToken.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

export { checkAdminRole };
