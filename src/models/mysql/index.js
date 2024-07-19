import mysql from 'mysql2/promise';
import { config } from '../../config/config.js';

async function delay () {
  return new Promise(resolve => setTimeout(resolve, 3000));
}

async function connectWithRetry () {
  await delay();
  try {
    const connection = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      port: config.dbPort,
      password: config.dbPassword,
      database: config.dbName
    });
    return connection;
  } catch (error) {
    console.error('Database connection failed, retrying in 3 seconds...', error);
    await delay();
    return connectWithRetry();
  }
}

let connection;

try {
  connection = await connectWithRetry();
} catch (error) {
  console.error('Failed to connect to the database after multiple attempts:', error);
}

export { connection };
