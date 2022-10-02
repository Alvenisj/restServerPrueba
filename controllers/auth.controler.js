const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/google-verify');
const { tieneRole } = require('../middleware');



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


const googleSignIn = async(req, res = response ) => {

    const { id_token } = req.body;
    
    try {
        
        const { nombre, correo, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });
        
        if ( !usuario ) {

          //TENGO QUE CREAR EL USUARIO
          const data = {              
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'ADMIN_ROLE',
                google: true

            }

            usuario = new Usuario( data );    
            console.log(usuario);
            await usuario.save((err, usuario) => {
                if(err) console.error(err)
                console.log(usuario);
            });      
        }

        if ( !usuario.estado ) {
          return res.status(500).json({
                msg: 'Hable con el administrador, usuario en false - BLOQUEADO'
                });
        }


        const token  = await generarJWT( usuario.id );

        res.json({               
            usuario,
            token
         });


    } catch (error) {

        res.status(500).json({
          msg: 'El token de GOOGLE no se pudo verificar'
          });

    }
    //     let usuario = await Usuario.findOne( { correo });
    //     console.log(usuario, token);
        
    //     const data = await usuario
        
    //     {
            
    //         nombre,
    //         correo,
    //         password: ':P',
    //         img,
    //         google: true
            
    //     };
        
    //     
        //        usuario = new Usuario( data ); 
        //        await usuario.save();
        //   }

         // REVISAR SI EL ESTADO SE ENCUENTRA EN FALSE
        // if ( !usuario.estado === false ) {

        //     return res.status(401).json({
        //         msg: 'Hable con el administrador, usuario en false - BLOQUEADO'
        //     });
        // } 

        //GENERAR EL JSON WEW TOKEN
        // const token  = await generarJWT( usuario.id );
    
    //  

        
 

    //   const { correo, nombre, img } = await googleVerify( id_token );
    //   console.log(correo, nombre, img);


}
module.exports = {

    login,
    googleSignIn
}