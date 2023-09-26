const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const BooksController = require("./controllers/booksController")

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", BooksController);

app.get("/", (req, res) => {
  res.send("Welcome to Bookie!");
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

module.exports = app;