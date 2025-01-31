/*
    ? Rutas de Eventos / Events
    ? host + /api/events
*/ 

import { Router } from "express"
import { check } from "express-validator"
import validarToken from "../middlewares/validarToken.js"
import validarCampos from '../middlewares/validarCampos.js'
import { getEvent, createEvent, updateEvent, deleteEvent } from "../controllers/eventsController.js"
import isDate from "../helpers/isDate.js"

const eventRouter = Router()

//! Todas las peticiones deben tener un token Válido
eventRouter.use( validarToken )

// Obtener los eventos
eventRouter.get( '/', getEvent )

// Crear eventos
eventRouter.post( 
    '/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent 
)

// Actualizar eventos
eventRouter.put( '/:id', updateEvent )

// Eliminar eventos
eventRouter.delete( '/:id', deleteEvent )

export default eventRouter