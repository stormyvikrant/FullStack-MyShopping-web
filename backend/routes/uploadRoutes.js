import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  //initialize storage engine and pass  object with two functions

  destination(req, file, cb) {
    cb(null, "uploads/"); //error and location
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//Now middleware

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //test give us true or false value
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }, //check file type etc
});
//upload is middleware HERE

router.post("/", upload.single("image"), (req, res) => {
  //remember name=> image for frontend
 
  res.send(`/${req.file.path}`); //give this path to image which will go to database
  res.send(`/${req.file.path.replace("\\", "/")}`);
});

export default router;
