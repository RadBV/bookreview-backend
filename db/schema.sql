DROP DATABASE IF EXISTS book_app;

CREATE DATABASE book_app;

\c book_app;

CREATE TABLE books {
    id SERIAL PRIMARY KEY,
    title text,
    author text,
    pages text,
    chapters text,
    genre text,
    cover_img text
}