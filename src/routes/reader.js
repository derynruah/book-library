const express = require('express');

const router = express.Router();
const readerController = require('../controllers/reader');

router.post ('/', readerController.create);
router.get ('/', readerController.findAll);
router.get ('/:readerId', readerController.readById);
router.patch ('/:readerId', readerController.update);
router.delete ('/:readerId', readerController.delete)


module.exports = router;