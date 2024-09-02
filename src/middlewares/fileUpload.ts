import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
