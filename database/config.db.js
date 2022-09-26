const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_ATLAS, { } );

        console.log('Data Base connected succesfuly');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar el proceso de la Base de datos');
        
    }


}



module.exports = {

    dbConnection
}