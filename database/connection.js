const { Sequelize } = require('sequelize');

// Configura a conexão do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  define: {
  freezeTableName: true
  },
  logging: false,
});

// Função para inicializar o banco e sincronizar as tabelas
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
