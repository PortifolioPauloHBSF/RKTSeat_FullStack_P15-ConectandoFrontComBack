import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    HASH_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
