const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User was registered successfully",
                  user: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Something went wrong",
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const signIn = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "Authentication failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              process.env.JWT_KEY,
              (err, token) => {
                res.status(200).json({
                  message: "Authentication successful",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Authentication failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

module.exports = { signUp, signIn };
