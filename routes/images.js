import { Router } from 'express';
import { ImageController } from '../controllers/images.js';
import { multerValidation } from '../middlewares/multer.js';
import { checkAdminRole } from '../middlewares/auth.js';

const createImageRouter = ({ imageModel }) => {
  const imagesRouter = Router();

  const imageController = new ImageController({ imageModel });

  imagesRouter.post('/:id',
    checkAdminRole,
    multerValidation,
    imageController.upload
  );

  imagesRouter.delete('/:id',
    checkAdminRole,
    imageController.deletePrevious
  );

  return imagesRouter;
};

export { createImageRouter };
