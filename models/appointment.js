'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.Patient, {
        foreignKey: 'patient_id',
        as: 'patients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctors',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Appointment.init(
    {
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      visit_reason: DataTypes.STRING,
      patient_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'patients',
          key: 'id'
        }
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'doctors',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments'
    }
  )
  return Appointment
}
