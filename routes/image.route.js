const express = require("express");
const imageController = require("../controllers/image.controller");
const imageUploader = require("../helpers/image.uploader");
const middleware = require("../middleware/check-auth");

const router = express.Router();

router.post(
  "/upload",
  middleware.checkAuth,
  imageUploader.upload.single("image"),
  imageController.uploadImage
);

module.exports = router;
