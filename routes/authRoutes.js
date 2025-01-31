/*
   Rutas de Usuarios / Auth
   host + /api/auth
*/ 

import { Router } from 'express'
import { check } from 'express-validator'
import validarCampos from "../middlewares/validarCampos.js"
import validarToken from '../middlewares/validarToken.js'
import { createUser, loginUser, revalidateToken } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post( 
   '/new',
   [
      check( 'name', 'El Nombre es obligatorio' ).not().isEmpty(),
      check( 'email', 'El Email es obligatorio o está mal escrito' ).isEmail(),
      check( 'password', 'El Password es obligatorio y mínimo 6 caracteres' ).isLength({ min: 6 }),
      validarCampos
   ], 
   createUser
)

authRouter.post( 
   '/',
   [
      check( 'email', 'El Email es obligatorio o está mal escrito' ).isEmail(),
      check( 'password', 'El Password es obligatorio y mínimo 6 caracteres' ).isLength({ min: 6 }),
      validarCampos
   ],   
   loginUser 
)

authRouter.get( '/renew', validarToken, revalidateToken )

export default authRouter