import { response } from 'express'
import { validationResult } from 'express-validator'

const validarCampos = ( req, res = response, next ) => {

    // Manejo de errores
    const errors = validationResult( req )
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}

export default validarCampos