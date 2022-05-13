const db = require('../db/dbconfig');

const getAllBooks = async () => {
    return await db.any("SELECT * FROM books")
}

const getSingleBook = async(id) => {
    return await db.oneOrNone('SELECT * FROM books WHERE id = $1', [id])
}

const createBook = async (bookData) => {
    return await db.one('INSERT INTO books(title, author, pages, chapters, genre, cover_img) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', bookData)
}

const updateBook = async (bookData) => {
    return await db.one('UPDATE books SET title=$1, author=$2, pages=$3, chapters=$4, genre=$5, cover_img=$6 WHERE id=$7 RETURNING *', bookData)
}



const deleteBook = async (id) => {
    return await db.oneOrNone('DELETE FROM books WHERE id = $1 RETURNING *', [id])
}
module.exports = {
    getAllBooks, 
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};