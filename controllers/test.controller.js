const models = require("../models");

const testController = async (req, res) => {
  //One to one - 1:1 - a user has one address, or an address belongs to only one user
  //One to many - 1:m - a user has many posts
  //Many to many - m:n - a post belongs to many categories

  //One to one
  //   const user = await models.User.findByPk(7, {
  //     include: [models.Address],
  //   });

  //   const address = await models.Address.findByPk(1, {
  //     include: [models.User],
  //   });

  //One to many
  //   const user = await models.User.findByPk(7, {
  //     include: [models.Post],
  //   });

  //Many to many
  //   const post = await models.Post.findByPk(13, {
  //     include: [models.Category],
  //   });
  res.status(200).json({
    data: post,
  });
};

module.exports = { testController };
