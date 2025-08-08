import express from 'express';
import routerTask from './src/routes/task_routes';
import routerUser from './src/routes/user_routes';
import { connectDB } from './src/config/database';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api",routerTask);
app.use("/api",routerUser);

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.listen(PORT, () =>
  console.log('>>> Servidor escuchando en http://localhost:' + PORT),
);