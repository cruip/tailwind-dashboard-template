const TableTB = require ("../model/modelTB");

const getAllTableTB = async (req, res) => {
    try {
        const tabletb = await TableTB.findAll();
        res.json(tabletb);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getTableTBById = async (req, res) => {
    try {
        const tabletb = await TableTB.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(tabletb[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}



const createTableTB = async (req, res) => {
    try {
        await TableTB.create(req.body);
        res.json({
            "message": "Data Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateTableTB = async (req, res) => {
    try {
        await TableTB.update(req.body, {
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

const deleteTableTB = async (req, res) => {
    try {
        await TableTB.destroy({
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

exports.getAllTableTB = getAllTableTB;
exports.getTableTBById = getTableTBById;
exports.createTableTB = createTableTB;
exports.updateTableTB = updateTableTB;
exports.deleteTableTB = deleteTableTB;