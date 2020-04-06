const { Router } = require('express');
const BooksComponent = require('.');
const router = Router();
router.get('/', BooksComponent.chart);
module.exports = router;
