const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Aquí se importa la instancia de Sequelize

const EstacionTrabajo = sequelize.define('EstacionTrabajo', {
  COD_ESTACION: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NOMBRE_ESTACION: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Otros campos de la tabla estacion_trabajo
}, {
  tableName: 'estacion_trabajo',
  timestamps: false // Si la tabla no tiene campos de timestamp
});
EstacionTrabajo.hasMany(User, { foreignKey: 'estacionTrabajoId' });

module.exports = EstacionTrabajo;
