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
      "INSERT INTO books(title, publisher, published_year, pages, genre, country, art, cover_artist, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        data.title,
        data.publisher,
        data.published_year,
        data.pages,
        data.genre,
        data.country,
        data.art,
        data.cover_artist,
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
      "UPDATE books SET title = $1, publisher = $2, published_year = $3, pages = $4, genre = $5, country = $6, cover_artist = $7, art = $8, description = $9 WHERE id = $10 RETURNING *",
      [
        newBook.title,
        newBook.publisher,
        newBook.published_year,
        newBook.pages,
        newBook.genre,
        newBook.country,
        newBook.cover_artist,
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
