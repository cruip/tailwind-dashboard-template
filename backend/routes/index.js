import express  from "express";

import {
    getAllTipePerawatan,
    getTipePerawatanById,
    createTipePerawatan,
    updateTipePerawatan,
    deleteTipePerawatan
} from "../controllers/TipePerawatan.js";

const router = express.Router();

router.get('/', getAllTipePerawatan);
router.get('/:id', getTipePerawatanById);
router.post('/', createTipePerawatan);
router.patch('/:id', updateTipePerawatan);
router.delete('/:id', deleteTipePerawatan);

export default router;