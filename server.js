const { app } = require('./app');
const { initDatabase } = require('./database/connection');

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Aguarda o banco de dados inicializar
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${'http://localhost:' + PORT}`);
  });
}

startServer();