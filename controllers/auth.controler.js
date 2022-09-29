const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJwt');


const login = async( req, res=response) => {


    const { correo, password } = req.body;

    try {

        //VERIFICAR SI EL CORREO EXISTE
      const usuario = await Usuario.findOne( { correo });
      if (!usuario){
        res.status(400).json({

            msg: 'Usuario / Password, no son correctas - correo'
        });
      }

        //VERIFICAR SI EL USUARIO SE ENCUENTRA ACTIVO
        if( !usuario.estado ){
            res.status(400).json({
    
                msg: 'Usuario / Password, no son correctas - estado-false'
            });
          }

        //VERIFICAR CONTRASEÑA
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {

            return  res.status(400).json({

                msg: 'Usuario / Password, no son correctas - password--'
            });

        }

        //GENERAR EL JWT

        const token = await generarJWT( usuario.id )


        res.json({ 

           usuario,
           token
        })
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: 'Error Habla con el ADMINISTRADOR'
        })
        
    }


    

}



module.exports = {

    login
}