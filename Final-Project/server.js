const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../main.js"));
});

app.use("/css", express.static(path.join(__dirname, "../style.css")));

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`On the internet like ${port}`);
});
