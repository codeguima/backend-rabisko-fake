import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Routes from './src/routes/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', Routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
