import { Router } from 'express';
import { UserController } from '../controllers/users.js';
import { checkLogin } from '../middlewares/auth.js';
import { handleValidationError } from '../middlewares/validation.js';
import { updateUserSchema, userSchema } from '../schemas/users.js';

const createUserRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get('/', userController.getAll);
  usersRouter.get('/:id', userController.findOne);

  usersRouter.post(
    '/',
    handleValidationError(userSchema, 'body'),
    userController.create
  );
  usersRouter.patch(
    '/:id',
    checkLogin,
    handleValidationError(updateUserSchema, 'body', true),
    userController.update
  );

  usersRouter.delete(
    '/:id',
    checkLogin,
    userController.delete
  );

  return usersRouter;
};

export { createUserRouter };
