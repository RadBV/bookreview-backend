const express = require("express");
const router = express.Router();

const bookData = require("../bookData.json");

router.get("/", (request,response) => {
    let books = bookData.books
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

router.get("/:id", (request,response) => {
    const bookId = request.params.id
    if(!/[0-9]/.test(bookId)){
        throw "Book ID must be an integer";
    };

    const books = bookData.books;
    const singleBook = books.find(book => book.id === bookId);

    if(singleBook){
        response.json(singleBook)
    } else {
        throw "No book with this ID found"
    }
})


module.exports = router;