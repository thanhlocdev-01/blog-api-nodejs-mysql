const Validator = require("fastest-validator");
const models = require("../models");

const createPost = (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: req.userData.userId,
  };
  console.log(req.userData);
  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };
  const v = new Validator();
  const validationResponse = v.validate(post, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id).then((result) => {
    if (result !== null) {
      models.Post.create(post)
        .then((result) => {
          res.status(201).json({
            message: "Post created successfully",
            post: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalid Category ID",
      });
    }
  });
};

const getPost = (req, res) => {
  const id = req.params.id;

  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const getAllPost = (req, res) => {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const updatePost = (req, res) => {
  const id = req.params.id;
  const updatePost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  };
  const userId = req.userData.userId;

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };
  const v = new Validator();
  const validationResponse = v.validate(updatePost, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id).then((result) => {
    if (result !== null) {
      models.Post.update(updatePost, {
        where: { id: id, userId: userId },
      })
        .then((result) => {
          res.status(200).json({
            message: "Post was updated successfully",
            post: updatePost,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            err: err,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalid Category ID",
      });
    }
  });
};

const deletePost = (req, res) => {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Post.destroy({
    where: { id: id, userId: userId },
  })
    .then((result) => {
      res.status(200).json({
        message: "Post was deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        err: err,
      });
    });
};

module.exports = { createPost, getPost, getAllPost, updatePost, deletePost };
