import { env } from "@/env";

export const authConfig = {
    jwt: {
        secret: env.HASH_KEY,
        expiresIn: 60 * 60 * 24,
    },
};
