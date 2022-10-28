const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no books in the database', () => {
        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app)
                .post('/books')
                .send({
                    title: 'The Hobbit',
                    author: 'J.R.R Tolkien',
                    genre: 'Fantasy',
                    ISBN: 'JRRT101010',
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('The Hobbit')
                expect(newBookRecord.title).to.equal('The Hobbit')
                expect(newBookRecord.author).to.equal('J.R.R Tolkien')
                expect(newBookRecord.genre).to.equal('Fantasy')
                expect(newBookRecord.ISBN).to.equal('JRRT101010')
            });
        });
    });

    describe('with records in the database', () => {
        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'The Hobbit',
                    author: 'J.R.R Tolkien',
                    genre: 'Fantasy',
                    ISBN: 'JRRT101010',
                }),
                Book.create({ 
                    title: 'Twilight', 
                    author: 'Stephanie Meyer',
                    genre: 'Fantasy',
                    ISBN: 'SM101010'
                }),
                Book.create({ 
                    title: 'Fear and Loathing in Las Vegas', 
                    author: 'Hunter S. Thompson',
                    genre: 'Gonzo',
                    ISBN: 'HSJ101010',
                })
            ]);
        });

        describe('/GET /books', () => {
            it('gets all book records', async () => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((book) => {
                    const expected = books.find((a) => a.id === book.id);

                    expect(book.title).to.equal(expected.title);
                    expect(book.author).to.equal(expected.author);
                    expect(book.genre).to.equal(expected.genre);
                    expect(book.ISBN).to.equal(expected.ISBN);
                });
            });
        });

        describe('GET /books/:id', () => {
            it('gets book record by id', async () => {
                const book = books[0];
                const response = await request(app).get(`/books/${book.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal(book.title)
                expect(response.body.author).to.equal(book.author)
                expect(response.body.genre).to.equal(book.genre)
                expect(response.body.ISBN).to.equal(book.ISBN)
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app).get('/books/9878997877');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('PATCH /books/:id', () => {
            it('updates the record with id', async () => {
                const book = books[0];
                const response = await request(app)
                .patch(`/books/${book.id}`)
                .send({ ISBN: 'anon12345' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.ISBN).to.equal('anon12345');
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app)
                .patch('/books/9878997877')
                .send({ ISBN: 'anon12345' });

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('DELETE /books/:id', () => {
            it('deletes book record by ISBN', async () => {
                const book = books[0];
                const response = await request(app).delete(`/books/${book.id}`);
                const deletedBook = await Book.findByPk(book.id, { raw: true});

                expect(response.status).to.equal(204);
                expect(deletedBook).to.equal(null)
            });

            it('returns a 404 error if the book does not exist', async () => {
                const response = await request(app).delete('/books/9878997877');
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });
    });
});