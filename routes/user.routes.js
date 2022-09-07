const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/user.controller');



const router = Router();


router.post('/', usuariosPost);
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);



module.exports = router;
