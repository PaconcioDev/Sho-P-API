import { Router } from 'express';
import { ImageController } from '../controllers/images.js';
import { multerValidation } from '../middlewares/multer.js';
import { checkAdminRole } from '../middlewares/auth.js';

const createImageRouter = ({ imageModel }) => {
  const imagesRouter = Router();

  const imageController = new ImageController({ imageModel });

  imagesRouter.post('/cloudinary',
    checkAdminRole,
    multerValidation,
    imageController.cloudinaryUpload
  );
  imagesRouter.post(
    '/:id',
    checkAdminRole,
    imageController.upload
  );

  imagesRouter.delete(
    '/delete/:id',
    checkAdminRole,
    imageController.deleteCurrent
  );
  imagesRouter.delete('/:id',
    checkAdminRole,
    imageController.deletePrevious
  );

  return imagesRouter;
};

export { createImageRouter };
