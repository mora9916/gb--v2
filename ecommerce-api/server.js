import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';

dotenv.config();

const app = express();
dbConnection();

// === CORS AQUÍ ===
app.use(cors({
    origin: [
        "http://localhost:4200",  // desarrollo Angular
        "http://localhost:5173",  // Vite si algún día lo usas
        "https://gb-v2-front.onrender.com", // Static site en Render
    ],
    credentials: true
}));

app.use(express.json());
app.use(logger);

app.use('/api', routes);

app.get('/', (req, res)=> {
    res.send('Welcome');
});

app.listen(process.env.PORT, () => {
    console.log('Server running en http://localhost:'+process.env.PORT);
});

console.log('build actualizado');