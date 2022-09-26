const Role = require('../models/role');
const Usuario = require('../models/usuario');

const roleValido = async(rol = '') => {


    const existRol = await Role.findOne( { rol });
    if ( !existRol ) {

        throw new Error(`El rol ${ rol } no está en la base de datos`)
    }
}


const emailExist = async( correo = '') => {

        //VERIFICAR SI EL CORREO EXISTE
        const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ) {
    
            throw new Error(`El correo ${ correo } ya está registrado`)
        
        }
    

}

const existUsuarioId  = async( _id ) => {

    //VERIFICAR SI EL ID EXISTE
    const existId = await Usuario.findById({ _id: id });
   
    if ( !existId ) {

        throw new Error(`El id ${ id } no está registrado`);
    
    }


}


module.exports = {

    roleValido,
    emailExist,
    existUsuarioId

}