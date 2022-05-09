const TablePerformance = require ("../model/model_performance.js");

const getAllListPerformance = async (req, res) => {
    try {
        const tableperformace = await TablePerformance.findAll();
        res.json(tableperformace);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getDataPerformanceByID = async (req, res) => {
    try {
        const tableperformace = await TablePerformance.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(tableperformace[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}



const createDataPerformance = async (req, res) => {
    try {
        await TablePerformance.create(req.body);
        res.json({
            "message": "Data Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const updateDataPerformance = async (req, res) => {
    try {
        await TablePerformance.update(req.body, {
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

const deleteDataPerformance = async (req, res) => {
    try {
        await TablePerformance.destroy({
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

exports.getAllListPerformance = getAllListPerformance;
exports.getDataPerformanceByID = getDataPerformanceByID;
exports.createDataPerformance = createDataPerformance;
exports.updateDataPerformance = updateDataPerformance;
exports.deleteDataPerformance = deleteDataPerformance;