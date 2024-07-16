import { v2 as cloudinary } from 'cloudinary';
import { config } from './config.js';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

export { cloudinary };
