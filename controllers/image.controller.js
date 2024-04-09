const uploadImage = (req, res) => {
  if (req.file.filename) {
    res.status(201).json({
      message: "Image upload successfully",
      url: req.file.filename,
    });
  } else {
    res.status(500).json({
      message: "Image upload failed",
    });
  }
};

module.exports = { uploadImage };
