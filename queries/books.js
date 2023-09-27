const db = require("../db/dbConfig");

const getAllBooks = async () => {
  try {
    const allBooks = await db.any("SELECT * FROM books");

    return allBooks;
  } catch (error) {
    return error;
  }
};

async function getBook(id) {
  try {

    const foundBook = await db.any(`SELECT * FROM books WHERE id = $1`, id);

    return foundBook;

  } catch (error) {
    return error;
  }
}

const createBook = async (data) => {
  try {
    const newBook = await db.one(
      "INSERT INTO books(title, author, publisher, published_year, pages, genre, art, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        data.title,
        data.author,
        data.publisher,
        data.published_year,
        data.pages,
        data.genre,
        data.art,
        data.description
      ]
    );
    return { status: "successful!", data: newBook };
  } catch (error) {
    return error;
  }
};

const deleteBook = async (id) => {
  try {
    const deletedBook = await db.any(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    return { status: "successful!", data: deletedBook };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

const updateBook = async (id, data) => {
  try {
    const originalBook = await db.any("SELECT * FROM books WHERE id = $1", [
      id,
    ]);

    let newBook = {
      ...originalBook[0],
      ...data,
    };

    const updatedBook = await db.one(
      "UPDATE books SET title = $1, author = $2, publisher = $3, published_year = $4, pages = $5, genre = $6, art = $7, description = $8 WHERE id = $9 RETURNING *",
      [
        newBook.title,
        newBook.author,
        newBook.publisher,
        newBook.published_year,
        newBook.pages,
        newBook.genre,
        newBook.art,
        newBook.description,
        id,
      ]
    );

    return { status: "successful!", data: updatedBook };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
