const { validarCampos } = require('../middleware/validar-campos');
const { roleValido, emailExist, existUsuarioId } = require('../helpers/db-validator');

const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPost, 
        usuariosPut,
        usuariosDelete, 
        usuariosPatch } = require('../controllers/user.controller');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExist ),
    check('password', 'El password es obligatorio y más de 6 carácteres').isLength({ min: 6}),
    check('rol').custom( roleValido ),
    validarCampos

], usuariosPost );


router.put('/:id', [
    check('id', 'NO es un ID válido').isMongoId(),
    //check('id').custom( existUsuarioId ),
    check('rol').custom( roleValido ),
    validarCampos


], usuariosPut);


//RUTA DE BORRAR REGISTRO
router.delete('/:id', [
    check('id', 'NO es un ID válido').isMongoId(),
    //check('id').custom( existUsuarioId  ),
    validarCampos
], usuariosDelete);




router.patch('/', [],
 usuariosPatch);



module.exports = router;
