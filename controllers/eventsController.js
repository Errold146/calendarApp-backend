import { response } from "express"
import Event from "../models/EventModel.js"

// Obtener eventos
const getEvent = async ( req, res = response ) => {

   try {
        const eventos = await Event.find().populate('user', 'name')
        
        res.json({
            ok: true,
            eventos
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
}
 
// Crear eventos 
const createEvent = async ( req, res = response ) => {

    const evento = new Event( req.body )

    try {
        evento.user = req.uid
        const eventSave = await evento.save()
        res.status(200).json({
            ok: true,
            evento: eventSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, recargue e intente de nuevo'
        })
    }
}

// Actualizar eventos
const updateEvent = async ( req, res = response ) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const evento = await Event.findById(eventId)
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al encontrar el evento'
            })
        }
        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Acceso denegado'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true })
        res.status(200).json({
            ok: true,
            evento: updateEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, recargue e intente de nuevo'
        })
    }
}

// Eliminar eventos
const deleteEvent = async ( req, res = response ) => {
    
    const eventId = req.params.id
    const uid = req.uid

    try {
        const evento = await Event.findById(eventId)
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al encontrar el evento'
            })
        }
        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Acceso denegado'
            })
        }

        await Event.findByIdAndDelete( eventId )
        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado correctamente'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, recargue e intente de nuevo'
        })
    }
}

export {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
