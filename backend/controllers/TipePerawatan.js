const TipePerawatan = require ("../model/tipeperawatanModel");

const getAllTipePerawatan = async (req, res) => {
    try {
        const tipeperawatan = await TipePerawatan.findAll();
        res.json(tipeperawatan);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getTipePerawatanById = async (req, res) => {
    try {
        const tipeperawatan = await TipePerawatan.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(tipeperawatan[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}



const createTipePerawatan = async (req, res) => {
    try {
        await TipePerawatan.create(req.body);
        res.json({
            "message": "Data Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateTipePerawatan = async (req, res) => {
    try {
        await TipePerawatan.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Data Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const deleteTipePerawatan = async (req, res) => {
    try {
        await TipePerawatan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Data Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
exports.getAllTipePerawatan = getAllTipePerawatan;
exports.getTipePerawatanById = getTipePerawatanById;
exports.createTipePerawatan = createTipePerawatan;
exports.updateTipePerawatan = updateTipePerawatan;
exports.deleteTipePerawatan = deleteTipePerawatan;