import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import {
  checkLogin,
  // isTheSameUser
} from "../middlewares/auth.js";
import { handleValidationError } from "../middlewares/validation.js";
import {
  loginSchema,
  sendEmailSchema,
  updatePasswordSchema,
} from "../schemas/users.js";

const createAuthRouter = ({ authModel }) => {
  const authRouter = Router();
  const authController = new AuthController({ authModel });

  authRouter.post(
    "/login",
    handleValidationError(loginSchema, "body"),
    authController.login
  );
  authRouter.post(
    "/change-password",
    checkLogin,
    handleValidationError(updatePasswordSchema, "body"),
    // isTheSameUser
    authController.changePassword
  );
  authRouter.post(
    "/recovery",
    handleValidationError(sendEmailSchema, "body"),
    authController.recoverPassword
  );

  return authRouter;
};

export { createAuthRouter };
