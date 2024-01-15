import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import {
  checkLogin,
  // isTheSameUser
} from "../middlewares/auth.js";

const createAuthRouter = ({ authModel }) => {
  const authRouter = Router();
  const authController = new AuthController({ authModel });

  authRouter.post("/login", authController.login);
  authRouter.post(
    "/change-password",
    checkLogin,
    // isTheSameUser
    authController.changePassword
  );
  authRouter.post("/recovery", authController.recoverPassword);

  return authRouter;
};

export { createAuthRouter };
