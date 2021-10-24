import { Options, diskStorage } from "multer";
import { randomBytes } from "crypto";
import { resolve, extname } from "path";

const destination = resolve(__dirname, "..", "..", "uploads");

export const multerConfig: Options = {
  dest: destination,
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, destination);
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }

        const filename = hash.toString() + extname(file.originalname);
        callback(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (request, file, callback) => {
    const formats = ["image/jpeg", "image/jpg", "image/png"];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Format not accepted"));
    }
  },
};
