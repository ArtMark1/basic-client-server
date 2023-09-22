// const createServer = require("http").createServer;
const { readFileSync } = require("fs");
const { createServer } = require("http");
const port = 1234;
startServer(port);


function startServer(port) {
  const server = createServer();

  server.listen(port, showLink);

  server.addListener("request", handleRequest);
}

function handleRequest(request, response) {
  if (request.url.startsWith("/api/")) {
    handleAPI(request, response);
  } else {
    serveStatic(request, response);
  }

  console.log("request: ", request.url);
}

function handleAPI(request, response) {
  if (request.url == "/api/login") {
    handleLogin(request, response);
  } else {
    response.end("404");
  }
}

async function handleLogin(request, response) {
  const body = await readBody(request);
  const payload = JSON.parse(body);
  const { email, password } = payload;
  if (email == 'zuevartur777@gmail.com' && password == '12344321') {
    const token = 'correct';
    response.setHeader('Set-Cookie', `token=${token}; Max-Age:600; Path:/`);
    response.end("ok");
  } else {
    response.statusCode = 401;
    response.end('incorrect login or password!');
  }
  console.log("user: ", payload);
}

function readBody(request) {
  return new Promise((resolve) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      resolve(body);
    });
  });
}

async function serveStatic(request, response) {
  const { url } = request;

  if (url == "/" || url == '/index.html') {
    if (await checkAuth(request)) {
      response.statusCode = 302;
      response.setHeader('location', '/profile.html');
      response.end('already logged in');
      return
    }
    response.end(readFileSync("public/index.html"));
  } else if (url == '/profile.html') {
    if (await checkAuth(request)) {
      response.end(readFileSync("public/profile.html"));
      return
    }
    response.statusCode = 302;
    response.setHeader('location', '/');
    response.end('unauthorized');
  } else {
    try {
      response.end(readFileSync(`public${url}`));
    } catch {
      response.end(`<p>404</p>`);
    }
  }
}

async function checkAuth(request) {
  const { cookie } = request.headers;
  const { token } = Object.fromEntries(cookie?.split('; ').map(chunk => chunk.split('=')) || '');

  return token == 'correct';
}

function showLink() {
  console.log("server started at http://localhost:" + port);
}
