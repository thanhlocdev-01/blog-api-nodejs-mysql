const express = require("express");
const postController = require("../controllers/post.controller");
const middleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", middleware.checkAuth, postController.createPost);
router.get("/", postController.getAllPost);
router.get("/:id", postController.getPost);
router.patch("/:id", middleware.checkAuth, postController.updatePost);
router.delete("/:id", middleware.checkAuth, postController.deletePost);

module.exports = router;
