const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router.post ('/', bookController.createBook);
router.get ('/', bookController.getBooks);
router.get ('/:id', bookController.getBooksById);
router.patch ('/:id', bookController.updateBook);
router.delete ('/:id', bookController.deleteBook)



module.exports = router;