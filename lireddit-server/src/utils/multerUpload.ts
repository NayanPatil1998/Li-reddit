import multer, { FileFilterCallback } from "multer"
import path from "path"
import { makeRandomId } from "./makeRandomId"

export const upload = multer({
    storage: multer.diskStorage({
      destination: 'public/images',
      filename: (_, file, callback) => {
        const name = makeRandomId(15)
        callback(null, name + path.extname(file.originalname)) // e.g. jh34gh2v4y + .png
      },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true)
      } else {
        callback(new Error('Not an image'))
      }
    },
  })