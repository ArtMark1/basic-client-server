const createServer = require("http");
startServer();

function startServer() {
  const server = createServer();
  const port = 1234;
  server.listen(port);
}
