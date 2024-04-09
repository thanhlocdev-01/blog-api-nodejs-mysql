const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const commentRoute = require("./routes/comment.route");
const imageRoute = require("./routes/image.route");
const testRoute = require("./routes/test.route");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
app.use("/image", imageRoute);
app.use("/test", testRoute);

module.exports = app;
