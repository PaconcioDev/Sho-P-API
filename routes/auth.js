import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { checkLogin, returnDecodedToken } from "../middlewares/auth.js";
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
    "/change-password/:id",
    checkLogin,
    handleValidationError(updatePasswordSchema, "body"),
    authController.changePassword
  );
  authRouter.post(
    "/recovery",
    handleValidationError(sendEmailSchema, "body"),
    authController.sendPasswordEmail
  );
  authRouter.post(
    "/recover-password",
    returnDecodedToken,
    handleValidationError(updatePasswordSchema, "body"),
    authController.recoverPassword
  );

  return authRouter;
};

export { createAuthRouter };
