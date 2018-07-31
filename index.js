const express = require("express");
const escapeHtml = require("escape-html");
const fs = require("fs");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const rawContent = fs.readFileSync("content.txt", "utf8");
const htmlContent = rawContent.replace(/[^.,\s]+/g, m => {
  const className = m.match(/^[aeiou]/i) ? "baky" : "kola";
  return `<span class="${className}">${escapeHtml(m)}</span>`;
});
const selectedTokens = new Set();

io.on("connection", socket => {
  socket.on("select", ({ tokenIndex }) => {
    selectedTokens.add(tokenIndex);
    socket.broadcast.emit("select", { tokenIndex });
  });
  socket.on("deselect", ({ tokenIndex }) => {
    selectedTokens.delete(tokenIndex);
    socket.broadcast.emit("deselect", { tokenIndex });
  });
});

app.get("/", (req, res) => {
  const init = Array.from(selectedTokens);
  res.send(`<!DOCTYPE html>
<link rel="stylesheet" href="/style.css">
<title>Reddit Token Selector</title>
<div class="content">${htmlContent}</div>
<script src="/socket.io/socket.io.js"></script>
<script>const selectedTokens = new Set([${init.join(",")}]);</script>
<script src="/app.js"></script>`);
});

app.use(express.static("public"));
http.listen(3000, () => console.log("Listening on *:3000"));
