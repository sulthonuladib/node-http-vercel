// api/server.js
const http = require("http");

const server = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Basic routing
  if (req.method === "GET") {
    switch (req.url) {
      case "/":
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Welcome to the Vercel Node.js server!",
            timestamp: new Date().toISOString(),
          }),
        );
        break;

      case "/health":
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "healthy" }));
        break;

      default:
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not found" }));
    }
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
  }
};

module.exports = server;
