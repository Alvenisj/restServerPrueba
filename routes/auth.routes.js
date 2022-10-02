const { Router } = require('express');
const { check } = require('express-validator');

const { tieneRole } = require('../middleware/validarRoles');

const { login, googleSignIn } = require('../controllers/auth.controler');
const { validarCampos } = require('../middleware/validar-campos');



const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],


login );


router.post('/google', [
    check('id_token', 'Id_Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn );




module.exports = router;