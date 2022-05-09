//importing module
const express = require('express');
const TipePerawatan = require('../controllers/TipePerawatan.js');

//creating express routes
const router = express.Router();

router.get('/', TipePerawatan.getAllTipePerawatan);
router.get('/:id', TipePerawatan.getTipePerawatanById);
router.post('/', TipePerawatan.createTipePerawatan);
router.patch('/:id', TipePerawatan.updateTipePerawatan);
router.delete('/:id', TipePerawatan.deleteTipePerawatan);


module.exports = router;