import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { checkLogin } from "../middlewares/auth.js";

const createUserRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get("/", userController.getAll);
  usersRouter.get("/:id", userController.findOne);

  usersRouter.post("/", userController.create);
  usersRouter.patch("/:id", checkLogin, userController.update);
  usersRouter.delete("/:id", checkLogin, userController.delete);

  return usersRouter;
};

export { createUserRouter };
