const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  define: {
  freezeTableName: true
  },
  logging: false,
});

async function initDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  initDatabase,
};
