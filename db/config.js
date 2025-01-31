import mongoose from "mongoose"

const dbConection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN )
        console.log( 'DB conectada correctamente' )

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar la base de datos')
    }
}

export default dbConection

