import multer from 'multer';
import { extname } from 'node:path';

const uploadImage = multer({
  limits: { fileSize: 50000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
    const mimetype = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(extname(file.originalname));
    if (mimetype && extName) {
      return cb(null, true);
    }
    cb(new Error('Wrong file type'));
  }
}).single('image');

function multerValidation (req, res, next) {
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = 'Image too heavy';
      return res.status(422).send(err);
    }
    next();
  });
}

export { multerValidation };
