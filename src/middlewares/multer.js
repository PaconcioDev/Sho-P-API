import multer from 'multer';
import { extname } from 'node:path';

const uploadImage = multer({
  limits: { fileSize: 10000000 },
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
      return res.status(422).json({ error: 'Image too heavy' });
    }
    next();
  });
}

export { multerValidation };
