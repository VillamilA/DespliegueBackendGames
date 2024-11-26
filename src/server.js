// Requerir módulos
import express from 'express';
import jsonServer from 'json-server';
import path from 'path';
import routerGame from './routers/games_routes.js'; // Asegúrate de que este archivo exista
import routerUser from './routers/user_routes.js'; // Asegúrate de que este archivo exista

// Inicializaciones
const app = express();

// Variables
const PORT = process.env.PORT || 3000; // Cambié de "puertito" a "PORT" para compatibilidad con Render

// Middlewares
app.use(express.json()); // Permite manejar JSON en las solicitudes

// Rutas principales
app.get('/', (req, res) => {
    res.send("Server running successfully!");
});

// Rutas Games
app.use('/api/games', routerGame);

// Rutas Usuarios
app.use('/api/users', routerUser);

// Configuración de JSON Server
const jsonRouter = jsonServer.router('db.json'); // Archivo de base de datos simulado
const middlewares = jsonServer.defaults({
    static: false, // Deshabilita búsqueda de la carpeta "public"
});
app.use('/api/db', middlewares, jsonRouter);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send({ error: "Ruta no encontrada" });
});

// Exportar la variable app
export default app;
