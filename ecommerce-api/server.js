import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // <-- Asegúrate de tener este import
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';
import errorHandler from './src/middlewares/errorHandler.js';
import setupGlobalErrorHandlers from './src/middlewares/globalErrorHandler.js';
import cors from 'cors';

dotenv.config();

setupGlobalErrorHandlers();

const app = express();

// DECLARACIÓN DEL PUERTO (Esto es lo que faltaba)
const PORT = process.env.PORT || 3000;

dbConnection();

// Este bloque de mongoose.connect ya suele estar dentro de dbConnection()
// Si dbConnection() ya conecta, puedes borrar estas líneas. 
// Si no, asegúrate de tener el import de mongoose arriba.
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'gb_database'
}).then(() => console.log("Conectado a gb_database"))
  .catch(err => console.error("Error de conexión:", err));

app.use(cors({
    origin: [
      process.env.FRONT_APP_URL, 
      "http://localhost:5173",
      "https://goldenbreak.com.mx",  
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('WELCOME!');
});

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    method: req.method,
    url: req.originalUrl
  });
});

app.use(errorHandler);

// LA SOLUCIÓN AL PORT BINDING
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});