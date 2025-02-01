import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  PORT: z.string().default('3000'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().default('5432'),
  DB_NAME: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

// Validate and export environment variables
const env = envSchema.parse(process.env);

export const config = {
  port: parseInt(env.PORT, 10),
  database: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    database: env.DB_NAME,
  },
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  isProduction: env.NODE_ENV === 'production',
} as const;

export default config;