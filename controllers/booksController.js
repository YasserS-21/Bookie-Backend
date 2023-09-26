const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../queries/books.js");

router.get("/", async (req, res) => {
    const allBooks = await getAllBooks();
  
    if (Array.isArray(allBooks)) {
      res.json(allBooks);
    } else {
      res.status(500).json({ error: "Server error" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const book = await getBook(id);
    if (book.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(book[0]);
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedBook = await deleteBook(id);
    if (deletedBook.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(deletedBook[0]);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const artUrl = req.body.art
        ? req.body.art
        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  
      const bookData = {
        ...req.body,
        art: artUrl,
      };
  
      const book = await createBook(bookData);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: "error" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const artUrl = req.body.art ? req.body.art : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  
      const updatedBookData = {
        ...req.body,
        art: artUrl,
      };
  
      const updatedBook = await updateBook(id, updatedBookData);
      if (updatedBook.length === 0) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.json(updatedBook[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;