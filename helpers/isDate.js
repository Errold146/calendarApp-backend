import moment from "moment"

const isDate = ( value ) => {
    if( !value ) return false

    const fecha = moment( value )
    if( fecha.isValid() ) {
        return true
    } else {
        return false
    }
}

export default isDate