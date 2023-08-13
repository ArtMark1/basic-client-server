// const createServer = require("http").createServer;
const { readFileSync } = require("fs");
const { createServer } = require("http");

startServer();

function startServer() {
  const server = createServer();
  const port = 1234;

  server.listen(port);

  server.addListener("request", handleRequest);
}

function handleRequest(request, response) {
  if (request.url == "/favicon.ico") {
    const icon = readFileSync("public/favicon.ico");
    response.end(icon);
  } else {
    response.end("hello client");
  }
  console.log("request: ", request.url);
}
