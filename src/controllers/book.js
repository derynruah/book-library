const { Book } = require('../models');
const book = require('../models/book');

exports.create = async(req, res) => {
    const newBookRecord = await Book.create(req.body);
    res.status(201).json(newBookRecord);
};

exports.findAll = async (_, res) => {
    const books = await Book.findAll();
    res.status(200).json(books);
};

exports.readById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByPk(bookId);

  if (!book) {
    res.status(404).json({ error: 'The book could not be found.' })
  } else {
    res.status(200).json(book);
  };
};

exports.update = async(req, res) => {
  const { bookId } = req.params;
  const updateData = req.body;

  const [ updatedRows ] = await Book.update(updateData, { where: {id: bookId } });

  if (!updatedRows) {
    res.status(404).json({ error: 'The book could not be found.'})
  } else {
    res.status(200).json();
  };
};

exports.delete = async (req, res) => {
  const { bookId } = req.params;
  const deletedRows = await Book.destroy({ where: { id: bookId }});

  if (!deletedRows) {
    res.status(404).json({ error: 'The book could not be found.'})
  } else {
    res.status(204).json();
  };
};