const Validator = require("fastest-validator");
const models = require("../models");
const e = require("express");

// Create a new comment
const createComment = (req, res) => {
  const comment = {
    content: req.body.content,
    postId: req.body.post_id,
    userId: req.userData.userId,
  };

  const schema = {
    content: { type: "string", optional: false, max: "500" },
    postId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(comment, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Post.findByPk(req.body.post_id)
    .then((post) => {
      if (post === null) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        models.Comment.create(comment)
          .then((result) => {
            res.status(201).json({
              message: "Comment created successfully",
              comment: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Something went wrong",
              error: error,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// Get a comment by id
const getComments = (req, res) => {
  const id = req.params.id;

  models.Comment.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// Get all comments
const getAllComments = (req, res) => {
  models.Comment.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// Update a comment
const updateComment = (req, res) => {
  const id = req.params.id;

  const updatedComment = {
    content: req.body.content,
  };

  const userId = req.userData.userId;

  const schema = {
    content: { type: "string", optional: false, max: "500" },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedComment, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Comment.update(updatedComment, { where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Comment updated successfully",
        comment: updatedComment,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

// Delete a comment
const deleteComment = (req, res) => {
  const id = req.params.id;
  const userId = req.userData.userId;
  models.Comment.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
};
module.exports = {
  createComment,
  getComments,
  getAllComments,
  updateComment,
  deleteComment,
};
