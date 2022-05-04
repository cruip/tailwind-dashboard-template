const Sequelize = require('sequelize');

const db = new Sequelize('rsui', 'root', '',{
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;