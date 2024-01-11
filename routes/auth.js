import { Router } from "express";
import { AuthController } from "../controllers/auth.js";

const createAuthRouter = ({ authModel }) => {
  const authRouter = Router();

  const authController = new AuthController({ authModel });

  authRouter.post("/sign-up", authController.signUp);
  //TODO: authRouter.post("/sign-in", authController.signIn);

  return authRouter;
};

export { createAuthRouter };
