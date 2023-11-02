const path = require("path");
// ============================
const multer = require("multer");
// ============================
const { staticPath } = require("../config/staticConfig");

const storageBookImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(staticPath, "./images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const filterBookImage = (req, file, cb) => {
  const MIMETYPE_REGEXP = /^image\/(jpeg|jpg|gif|png)$/;
  if (MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(null, false);
  // if (
  //   file.mimetype === "image/png" ||
  //   file.mimetype === "image/jpeg" ||
  //   file.mimetype === "image/gif"
  // ) {
  //   return cb(null, true);
  // }
  // cb(null, false);
};

const storageCustomerAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(staticPath, "./avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const filterCustomerAvatar = (req, file, cb) => {
  const MIMETYPE_REGEXP = /^image\/(jpeg|jpg|gif|png)$/;
  if (MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(null, false);
};

module.exports.uploadBookImage = multer({
  storage: storageBookImage,
  fileFilter: filterBookImage,
});

module.exports.uploadCustomerAvatar = multer({
  storage: storageCustomerAvatar,
  fileFilter: filterCustomerAvatar,
});
