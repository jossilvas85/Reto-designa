import express, { Request, Response } from 'express';
import personasRoutes from './routes/personas.routes';
import { ConnectDB } from './config/db.config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/personas', personasRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcional');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  ConnectDB();
});
