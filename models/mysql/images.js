import mysql from 'mysql2/promise';
import { cloudinary } from '../../config/cloudinaryConfig.js';
import { config } from '../../config/config.js';

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName
});

class ImageModel {
  static async upload ({ file, productId }) {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }).end(file.buffer);
    });

    try {
      await connection.query(
        `
        INSERT INTO image (id, url, product_id)
        VALUES (?, ?, UUID_TO_BIN(?))
        `,
        [response.public_id, response.url, productId]
      );
    } catch (error) {
      throw new Error('Error uploading image');
    }

    return response.url;
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
      console.error(error);
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
