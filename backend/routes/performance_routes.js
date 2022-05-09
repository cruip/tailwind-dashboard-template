//importing the module
const express = require('express');

const TablePerformance = require('../controllers/controllers_performance.js')

//creating express router
const router = express.Router();

//handling TablePerformance
router.get('/', TablePerformance.getAllListPerformance);
router.get('/:id', TablePerformance.getDataPerformanceByID);
router.post('/', TablePerformance.createDataPerformance);
router.patch('/:id', TablePerformance.updateDataPerformance);
router.delete('/:id', TablePerformance.deleteDataPerformance);

module.exports = router;