const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        // verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }

        //verificar contraseña
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // generar TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}