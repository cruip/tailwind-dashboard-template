import { Sequelize } from "sequelize/types";

const db = new Sequelize('rsui', 'root', '',{
    host: "localhost",
    dialect: "mysql"
});

export default db;