import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//? Variables de entorno
dotenv.config()

import eventRouter from './routes/eventsRoutes.js'
import authRouter from './routes/authRoutes.js'
import dbConection from './db/config.js'

//? Crear el servidor de express
const app = express()

//? Conexión a base de datos
dbConection()

//? Cors
app.use(cors())

//? Directorio Público
app.use(express.static('public'))

//? Lectura y parseo del body
app.use( express.json() )

//? Rutas
app.use('/api/auth', authRouter)
app.use('/api/events', eventRouter)

//? Escuchar peticiones
const port = process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})
