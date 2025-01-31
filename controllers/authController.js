import { response } from "express"
import bcrypt from 'bcryptjs'
import UserSchema from "../models/UserModel.js"
import generateJWT from "../helpers/jwt.js"

const createUser = async ( req, res = response ) => {
    
    const { email, password } = req.body

    try {
        // Verificar si el usuario ya existe
        let usuario = await UserSchema.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        // Crear nuevo usuario
        usuario = new UserSchema( req.body )

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )

        await usuario.save()

        // Generar token
        const token = await generateJWT( usuario.id, usuario.name )

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        })
    }
}

const loginUser = async ( req, res = response ) => {
    
    const { email, password } = req.body

    try {
        // Verificar si el usuario ya existe
        const usuario = await UserSchema.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email inválido'
            })
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync( password, usuario.password )
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar token
        const token = await generateJWT( usuario.id, usuario.name )

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        })
    }
}

const revalidateToken = async ( req, res = response ) => {

    const { uid, name } = req

    // Generar un nuevo token
    const token = await generateJWT( uid, name )

    res.json({
        ok: true,
        token
    })
}

export {
    createUser,
    loginUser,
    revalidateToken,
}
