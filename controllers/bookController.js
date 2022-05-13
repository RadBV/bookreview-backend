const express = require("express");
const router = express.Router();

const db = require("../db/dbconfig");


//-- get all books
router.get("/", async (request,response) => {

    let books = await db.any("SELECT * FROM books")

    console.log(books);

    let {start, end, title} = request.query;
    start = Number(start), end = Number(end);
    console.log(start,end)
    if(start && end && title){
        books = books.filter(book => book.id >= start && book.id <= end && book.title.toLowerCase().includes(title))
    } else if(start && end){
        books = books.filter(book => book.id >= start && book.id <= end)
    }  else if(title){
        books = books.filter(book => book.title.toLowerCase().includes(title))
    }
    response.json(books)
})

//-- get book by id
router.get("/:id", async (request,response) => {
    try {
        const bookId = request.params.id
        if(!/[0-9]/.test(bookId)){
            throw "Book ID must be an integer";
        };

        const singleBook = await db.oneOrNone('SELECT * FROM books WHERE id = $1', [bookId])

        if(singleBook){
            let payload = {
                status: "success",
                book: singleBook
            }
            response.json(payload)
        } else {
            throw "No book with this ID found"
        }
    } catch (err) {
        response.status(500).send({
            status:"error",
            message: "No book with this ID found"
        })
    } 
})

//-- create new book
router.post("/", async (request,response) => {
    try {
        
        let infoArr = [
            request.body.title, 
            request.body.author, 
            request.body.pages, 
            request.body.chapters, 
            request.body.genre, 
            request.body.cover_img]

        const book = await db.one('INSERT INTO books(title, author, pages, chapters, genre, cover_img) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', infoArr)
        response.json(book)

    } catch (err) {
        console.log(err)
        response.send(err.message)
    }
})

//-- update book
router.put("/:id", async (request,response) => {
    try {
        const bookId = request.params.id
        let singleBook = await db.oneOrNone('SELECT * FROM books WHERE id = $1', [bookId])


        let infoArr = [
            request.body.title || singleBook.title, 
            request.body.author || singleBook.author, 
            request.body.pages || singleBook.pages, 
            request.body.chapters || singleBook.chapters,
            request.body.genre || singleBook.genre, 
            request.body.cover_img || singleBook.cover_img, 
            bookId]

        let updatedbook = await db.one('UPDATE books SET title=$1, author=$2, pages=$3, chapters=$4, genre=$5, cover_img=$6 WHERE id=$7 RETURNING *', infoArr)
        response.send(updatedbook)

    } catch (err) {
        console.log(err)
        response.status(500).send(err.message)
    }
})

//-- delete book
router.delete("/:id", async (request, response) => {
    try {
        const bookId = request.params.id

        const {title,author} = await db.oneOrNone('DELETE FROM books WHERE id = $1 RETURNING *', [bookId])
        response.json({
            status: "succes",
            message: `${title} by ${author} has been deleted`
        })
    } catch (err) {
        console.log(err)
        response.send(err)
    }
})

module.exports = router;