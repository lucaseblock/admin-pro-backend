/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/',validarJWT, getUsuarios);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El E-mail es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsario
);


router.put('/:id',
    [   
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El E-mail es obligatorio').isEmail(),
        // check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
 );


 router.delete('/:id',
    validarJWT,
    borrarUsuario
 );


module.exports = router;