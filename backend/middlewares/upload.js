const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "medivault_reports",   // folder in Cloudinary
    resource_type: "auto"          // allows images + PDFs
  }
});

const upload = multer({ storage , limits: { fileSize: 5 * 1024 * 1024 } }); 

module.exports = upload;
