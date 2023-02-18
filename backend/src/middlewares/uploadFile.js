const fs = require("fs");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const hospitalId = req.ethAddress;
      const directory = `./uploads/${hospitalId}`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const hospitalId = req.ethAddress;
      console.log(hospitalId);
      const originalFileName = file.originalname;
      const fileNameParts = originalFileName.split(".");
      const newFileName = `${hospitalId}.csv`;
      cb(null, newFileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;
