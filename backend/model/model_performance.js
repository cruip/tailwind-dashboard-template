const Sequelize = require("sequelize");
const db = require("../config/database.js");

const tablePerformance = db.define(
  "widget_performance",
  {
    date: {
      type: Sequelize.DATE,
    },
    count_of_transaction_date: {
      type: Sequelize.INTEGER,
    },
    max_T2: {
      type: Sequelize.INTEGER,
    },
    min_T2: {
      type: Sequelize.INTEGER,
    },
    avg_T2: {
      type: Sequelize.DOUBLE,
    },
    max_T3: {
      type: Sequelize.INTEGER,
    },
    min_T3: {
      type: Sequelize.INTEGER,
    },
    avg_T3: {
      type: Sequelize.DOUBLE,
    },
    max_T4: {
      type: Sequelize.INTEGER,
    },
    min_T4: {
      type: Sequelize.INTEGER,
    },
    avg_T4: {
      type: Sequelize.DOUBLE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = tablePerformance;
