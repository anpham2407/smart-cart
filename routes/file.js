import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("../storage", "/avatars"));
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + originalname);
  },
});

const upload = multer({ storage: storage });

/* POST new user */
router.post("/avatars", upload.single("avatar"), async (req, res, next) => {
  try {
    res.json(req.file);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
