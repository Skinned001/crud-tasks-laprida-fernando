import express from 'express';
import { connectDB } from './src/config/database.js';
import './src/models/task_model.js';
import './src/models/user_model.js';
import routerTask from './src/routes/task_routes.js';
import routerUser from './src/routes/user_routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Conectar a la DB y levantar el servidor 
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log('>>> Servidor escuchando en http://localhost:' + PORT)
  );
});
