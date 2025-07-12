import fs from "node:fs";
import path from "node:path";

import uploadConfig from "@/configs/upload";

class DiskStorage {
    saveFile = async (file: string) => {
        const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file);
        const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.access(tmpPath);
        } catch (error) {
            throw new Error(`File not found: ${tmpPath}`);
        }

        await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true });
        await fs.promises.rename(tmpPath, destPath);

        return file;
    };

    deleteFile = async (file: string, type: "tmp" | "upload") => {
        const pathFile =
            type === "tmp"
                ? path.resolve(uploadConfig.TMP_FOLDER, file)
                : path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            fs.promises.stat(pathFile);
        } catch {
            return;
        }

        await fs.promises.unlink(pathFile);
    };
}

export { DiskStorage };
