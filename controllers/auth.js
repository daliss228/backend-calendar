const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = express.response) => {

    const {email, password} = req.body;
    
    // manejo de errores
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     });
    // }

    try {
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }
        usuario = new Usuario(req.body);

        // encriptar contrasenia 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        // generar token
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
};

const loginUsuario = async (req, res = express.response) => {
    const {email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este email'
            });
        }
        // confirmar o firmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // generar token
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = express.response) => {

    const {uid, name} = req;

    // nuevo token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        msg: 'renew',
        token
        // uid,
        // name
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}