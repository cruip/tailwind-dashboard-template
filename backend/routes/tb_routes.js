//importing the module
const express = require('express');

const TableTB = require('../controllers/TableTB.js')

//creating express router
const router = express.Router();

//handling TableTB
router.get('/', TableTB.getAllTableTB);
router.get('/:id', TableTB.getTableTBById);
router.post('/', TableTB.createTableTB);
router.patch('/:id', TableTB.updateTableTB);
router.delete('/:id', TableTB.deleteTableTB);

module.exports = router;