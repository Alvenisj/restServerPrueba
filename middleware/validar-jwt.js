const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario');



const validarJWT = async( req = request, res = response, next ) => {


    const token = req.header('x-token');

     if( !token ) {

        return res.status(401).json( {

            msg: "No hay token en la petición"
        });

     }

     try {

        // { uid: '63310728fe849e0326f7e046', iat: 1664402171, exp: 1664416571 }
       const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

       //LEER EL USUARIO QUE CORRESPONDE AL UID
       const usuario = await Usuario.findById( uid );

       if( !usuario ) {

        return res.status(401).json( {

            msg: 'Token no válido - usuario no existe en BD'
        });
       }

      //VERIFICAR SI EL UID TIENE ESTADO EN TRUE
      if( !usuario.estado ) {

        return res.status(401).json( {

            msg: 'Token no válido - usuario con estado - false'
        });
      }

       req.usuario = usuario;
       

        next();

     } catch (error) {
        console.log(error);
        res.status(401).json( {

            msg: "Token no valido"
        });
        
     }


}


module.exports = {

    validarJWT
}