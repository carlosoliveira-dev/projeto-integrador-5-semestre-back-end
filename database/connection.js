const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || path.join(__dirname, '..', 'db.sqlite'),
  define: {
  freezeTableName: true
  },
  logging: false,
});

async function initDatabase() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true }); 
    await sequelize.sync(); 
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  initDatabase,
};
