import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { checkLogin, isTheSameUser } from "../middlewares/auth.js";

const createUserRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get("/", userController.getAll);
  usersRouter.get("/:id", userController.findOne);

  usersRouter.post("/", userController.create);
  usersRouter.patch("/:id", checkLogin, isTheSameUser, userController.update);
  usersRouter.delete("/:id", checkLogin, isTheSameUser, userController.delete);

  return usersRouter;
};

export { createUserRouter };
