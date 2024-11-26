// Requerir módulos 
import express from 'express'
import routerGame from './routers/games_routes.js' // Cambié a 'games_routes'
import routerUser from './routers/user_routes.js'

// Inicializaciones
const app = express()

// Variables 
app.set('port', process.env.puertito || 3000)

// Middlewares
app.use(express.json())

// Rutas 
app.get('/', (req, res) => {
    res.send("Server on")
})

// Rutas Games
app.use('/api', routerGame)

// Rutas Usuarios
app.use('/api', routerUser)

// Exportar la variable app 
export default app
