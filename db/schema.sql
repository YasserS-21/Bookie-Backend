DROP DATABASE IF EXISTS bookie_dev;

CREATE DATABASE bookie_dev;

\c bookie_dev;

DROP TABLE IF EXISTS bookie;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    publisher TEXT,
    published_year VARCHAR(4),
    pages INT,
    genre TEXT,
    art TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
    description TEXT DEFAULT 'no description available.'
);
