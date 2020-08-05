/*
    Rutas de eventos / auth host + /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate');
const {obtenerEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

const router = Router();
router.use(validarJWT);

// obtener eventos, todas hay que validar con el jwt
router.get(
    '/',
    obtenerEventos
);

// crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'El fecha de inicio es obligatoria').custom(isDate),
        check('end', 'El fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'El fecha de inicio es obligatoria').custom(isDate),
        check('end', 'El fecha de fin es obligatoria').custom(isDate),
    ],
    actualizarEvento
);

// borrar evento
router.delete(
    '/:id',
    eliminarEvento
);

module.exports = router;