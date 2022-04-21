const express = require("express");
const router = express.Router();

const bookData = require("../bookData.json");

router.get("/", (request,response) => {
    response.json({bookData})
})

router.get("/:id", (request,response) => {
    const bookId = Number(request.params.id)
    const books = bookData
    const singleBook = books.find(book => book.id === bookId  )
    response.json(singleBook)
})


module.exports = router;