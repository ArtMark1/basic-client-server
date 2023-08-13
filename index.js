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
  } else if (request.url == "/" || request.url == "/index.html") {
    const html = readFileSync("public/index.html");
    response.end(html);
  } else if (request.url == "/style.css") {
    const css = readFileSync("public/style.css");
    response.end(css);
  } else if (request.url == "/script.js") {
    const js = readFileSync("public/script.js");
    response.end(js);
  } else {
    response.end("hello client");
  }
  console.log("request: ", request.url);
}
