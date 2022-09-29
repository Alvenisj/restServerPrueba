const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conectar base de datos
        this.connectDB();
        
        //MIDDLEWARES
        this.middlewares();
        //RUTAS DE LA APLICACIÓN
        this.routes();

      }

      //CONECTAR A BASE DE DATOS

      async connectDB() {

        await dbConnection();

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

          this.app.use(this.authPath, require('../routes/auth.routes'));
          this.app.use(this.usuariosPath, require('../routes/user.routes'));

    }

        listenServer() {
          
            this.app.listen(this.port, () => {

                console.log('Running in port', this.port)
            })
        }

    }





module.exports = Server;