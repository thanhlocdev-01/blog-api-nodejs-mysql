const http = require("http");
const app = require("./app");
const { log } = require("console");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  log(`Server is running on port ${process.env.PORT}`);
});
