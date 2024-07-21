import { cloudinary } from '../../config/cloudinaryConfig.js';
import { connection } from './index.js';

class ImageModel {
  static async cloudinaryUpload ({ file }) {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }).end(file.buffer);
    });

    return response;
  }

  static async upload ({ publicId, imageUrl, productId }) {
    try {
      const [newImage] = await connection.query(
        `
        INSERT INTO image (id, url, product_id)
        VALUES (?, ?, UUID_TO_BIN(?))
        `,
        [publicId, imageUrl, productId]
      );

      return newImage.affectedRows > 0;
    } catch (error) {
      throw new Error('Error uploading image');
    }
  }

  static async deleteCurrent ({ id }) {
    try {
      const request = await cloudinary.uploader.destroy(id);
      return request;
    } catch (error) {
      throw new Error('Error deleting image');
    }
  }

  static async deletePrevious ({ id }) {
    const [image] = await connection.query(
      `
      SELECT * FROM image
      WHERE product_id = UUID_TO_BIN(?);
      `,
      [id]
    );

    if (!image) return false;

    try {
      await cloudinary.uploader.destroy(image[0].id);
    } catch (error) {
      throw new Error('Error deleting previous image');
    }

    try {
      const [deletedImage] = await connection.query(
        `
        DELETE FROM image
        WHERE product_id = UUID_TO_BIN(?)
        `,
        [id]
      );
      return deletedImage.affectedRows > 0;
    } catch (error) {
      throw new Error('Error deleting previous image');
    }
  }
}

export { ImageModel };
