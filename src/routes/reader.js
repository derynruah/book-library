const express = require('express');

const router = express.Router();
const readerController = require('../controllers/reader');

router.post ('/', readerController.createReader);
router.get ('/', readerController.getReaders);
router.get ('/:id', readerController.getReadersById);
router.patch ('/:id', readerController.updateReader);
router.delete ('/:id', readerController.deleteReader)


module.exports = router;