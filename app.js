import express from 'express';
import { connectDB } from './src/config/database.js';

import './src/models/task.model.js';
import './src/models/user.model.js';
import './src/models/compra.model.js';
import './src/models/user_compras.model.js'
// import './src/models/estadisticas.model.js';

import routerTask from './src/routes/task.routes.js';
import routerUser from './src/routes/user.routes.js';
import routerCompra from './src/routes/compra.routes.js';
import routerEstadisticas from './src/routes/estadisticas.routes.js';
import routerUserCompra from './src/routes/user_compra.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);
app.use("/api", routerCompra);
app.use("/api", routerEstadisticas);
app.use("/api", routerUserCompra);

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Conectar a la DB y levantar el servidor 
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log('>>> Servidor escuchando en http://localhost:' + PORT)
  );
});
