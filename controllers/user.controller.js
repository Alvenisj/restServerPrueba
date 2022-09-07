const { request } = require("express");


const usuariosGet = (req = request, res = response) => {

   const { q, nombre = 'sin nombre', apikey, page = 2, limit } = req.query;
    res.json({
        msg: 'Patch api - controlador GET con pruebaaaaa',
        q,
        nombre,
        apikey,
        page,
        limit
    });
  }


const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

  res.json({

        msg: 'Patch api - controlador POST con prueba',
        nombre, 
        edad
    });
}


const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({

        msg: 'Patch api - controlador PUT',
        id
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({

        msg: 'Patch api - controlador DELETE'
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