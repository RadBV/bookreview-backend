var app = require("../../app");
const supertest = require("supertest");

describe("returns json data for individual book", () => {
    it("returns JSON for book with an id", async () => {
        await supertest(app).get("/books/1")
        .expect(200)
        .then((response) => {
            expect(response.body.status).toBe("success")
            expect(response.body.book.title).toBe("The Lion, The Witch, and the Wardrobe")
        })
    })

    it("returns an error when no book with a given id is found", async () => {
        await supertest(app).get("/books/45")
        .expect(500)
        .then((response) => {
            expect(response.body.status).toBe("error")
            expect(response.body.message).toBe("No book with this ID found")
        })
    })

    let book = {
        title: "the ugly barnacle"
    }

    it("handles creation of new book and returns data for that book", async () => {
        await supertest(app)
        .post("/books")
        .set('Content-type','application/json')
        .send(book)
        .expect(200)
        .then((response) => {
            expect(response.body.title).toBe("the ugly barnacle")
        })
    })

})

