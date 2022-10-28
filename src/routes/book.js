const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router.post ('/', bookController.create);
router.get ('/', bookController.findAll);
router.get ('/:bookId', bookController.readById);
router.patch ('/:bookId', bookController.update);
router.delete ('/:bookId', bookController.delete)



module.exports = router;