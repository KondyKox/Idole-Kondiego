import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const idolName = req.body.idol_name || "idol";
    const extension = path.extname(file.originalname);
    cb(null, `${idolName}-${Date.now()}${extension}`); // new file name
  },
});

const upload = multer({ storage });
export default upload;
