const express = require("express");
const commentController = require("../controllers/comment.controller");
const middleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", middleware.checkAuth, commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getComments);
router.patch("/:id", middleware.checkAuth, commentController.updateComment);
router.delete("/:id", middleware.checkAuth, commentController.deleteComment);

module.exports = router;
