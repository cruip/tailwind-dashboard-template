const Sequelize = require("sequelize");
const db = require("../config/database.js");

const TipePerawatan = db.define(
  "monthly_2021_tipe_perawatan",
  {
    month: {
      type: Sequelize.DATE,
    },
    emergency: {
      type: Sequelize.INTEGER,
    },
    inpatient: {
      type: Sequelize.INTEGER,
    },
    outpatient: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = TipePerawatan;
