import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  mailAddress: process.env.MAIL_ADDRESS,
  mailPassword: process.env.MAIL_PASSWORD,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
};

export { config };
