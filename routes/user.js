import { Router } from "express";
import { UserController } from "../controllers/users.js";

const createUserRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get("/", userController.getAll);
  usersRouter.get("/:id", userController.findOne);

  usersRouter.post("/", userController.create);

  return usersRouter;
};

export { createUserRouter };
