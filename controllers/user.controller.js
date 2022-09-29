const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {

   //const { q, nombre = 'sin nombre', apikey, page = 2, limit } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

     const [ total, usuarios ] = await Promise.all([

      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip( Number( desde ))
      .limit(Number( limit ))

     ])

    res.json({
        total, 
        usuarios

    });
  }


const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //GUARDAR EN BASE DE DATOS
    await usuario.save();


  res.json({

        usuario
    });
}


const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

//Físicamente lo borramos
//const usuario = await Usuario.findByIdAndDelete( id );

const usuario = await Usuario.findByIdAndUpdate( id, { estado: false});

    res.json({

        usuario
    });
}




const usuariosPatch = (req, res = response) => {

    res.json({

        msg: 'Patch api - controlador PATCH'
    });
}






  module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosPut
  }