import http from "http";

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the server!");
});

server.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
