import { response } from "express"
import jwt from 'jsonwebtoken'

const validarToken = ( req , res = response, next ) => {

    // Enviar el x-token en los headers
    const token = req.header('x-token')
    
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEDD )
        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next()
}

export default validarToken