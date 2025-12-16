import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';
import errorHandler from './src/middlewares/errorHandler.js';
import setupGlobalErrorHandlers from './src/middlewares/globalErrorHandler.js';
import cors from 'cors';

dotenv.config(); // Carga las variables del .env local

setupGlobalErrorHandlers();

const app = express();

// 1. PUERTO: Usa el de Render o el 3000 local
const PORT = process.env.PORT || 3000;

// 2. CONEXIÓN A DB: 
// Usamos MONGODB_URI que es como la tienes en tu .env
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gb_database';
const dbName = process.env.MONGODB_DB || 'gb_database';

mongoose.connect(dbURI, {
  dbName: dbName
}).then(() => console.log(`Conectado a la DB: ${dbName}`))
  .catch(err => console.error("Error de conexión:", err));

// === CORS ===
app.use(cors({
    origin: [
      process.env.FRONT_APP_URL, // http://localhost:4200
      "https://goldenbreak.com.mx",  
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.send('WELCOME!'));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', url: req.originalUrl });
});

app.use(errorHandler);

// ESCUCHA: 0.0.0.0 es clave para Render, y no afecta en Local
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});