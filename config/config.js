import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
};

export { config };
