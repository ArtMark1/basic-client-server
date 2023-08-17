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
  if (request.url == "/") {
    response.end(readFileSync("public/index.html"));
  } else {
    try {
      response.end(readFileSync(`public${request.url}`));
    } catch {
      response.end(`<p>404</p>`);
    }
  }

  console.log("request: ", request.url);
}
