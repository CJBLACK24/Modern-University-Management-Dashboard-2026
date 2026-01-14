import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  BETTER_AUTH_SECRET: z.string().min(1),

  // App
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_BACKEND_BASE_URL: z.string().url(),

  // Cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: z.string().url(),

  // Redis
  REDIS_URL: z.string().url(),
  REDIS_CACHE_TTL: z.coerce.number().default(3600),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,

  REDIS_URL: process.env.REDIS_URL,
  REDIS_CACHE_TTL: process.env.REDIS_CACHE_TTL,
});
