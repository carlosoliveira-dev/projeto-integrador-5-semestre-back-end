const { app } = require('./app');
const { initDatabase } = require('./database/connection');

const PORT = process.env.PORT || 3001;

async function startServer() {
  await initDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${'http://localhost:' + PORT}`);
  });
}

startServer();
