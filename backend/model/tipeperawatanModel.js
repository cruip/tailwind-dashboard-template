import { Sequelize } from "sequelize";
import db from "../config/database";

const { DataTypes } = Sequelize;

const TipePerawatan = db.define(
  "monthly_2021_tipe_perawatan",
  {
    month: {
      type: DataTypes.DATE,
    },
    emergency: {
      type: DataTypes.INT,
    },
    inpatient: {
      type: DataTypes.INT,
    },
    outpatient: {
      type: DataTypes.INT,
    },
  },
  {
    freezeTableName: true,
  }
);
export default TipePerawatan;