const Sequelize = require("sequelize");
const db = require("../config/database.js");

const tableTB = db.define(
"tb",
{
    periode: {
        type: Sequelize.DATE,
      },
      coa: {
        type: Sequelize.CHAR,
    },
    name: {
        type: Sequelize.TEXT,
      },
      balance: {
          type: Sequelize.BIGINT,
        },
    },
    {
        freezeTableName: true,
      timestamps: false,
    }
  );
module.exports = tableTB;