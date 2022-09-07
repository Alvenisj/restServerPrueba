const express = require('express');
const cors = require('cors');

class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //MIDDLEWARES
        this.middlewares();
        //RUTAS DE LA APLICACIÓN
        this.routes();

      }

      middlewares() {

        // CORS
        this.app.use( cors());

        //Lectura y Parseo del Body

        this.app.use( express.json() );

        //Directorio Público
        this.app.use( express.static('public') );
      }

      routes() {

          this.app.use(this.usuariosPath, require('../routes/user.routes'));

    }

        listenServer() {
          
            this.app.listen(this.port, () => {

                console.log('Running in port', this.port)
            })
        }

    }





module.exports = Server;