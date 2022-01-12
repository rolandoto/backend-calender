const {Router} = require('express')
const {createRegister,loginUsuario,validateToken, DateUserio} =require('../controllers/Controllers')
const {check} =  require('express-validator')
const { validarCampos } = require('../middleweres/middleweares')
const { ValidateJWT } = require('../middleweres/ValidateJWT.JS')

const router  = Router()

router.post('/login',
                [
                check('email','el nombre es obligatori').isEmail(),
                check('password','el nombre es obligatori').isLength({min:6}),
                validarCampos
                ],
                loginUsuario)


router.post('/register', [//middleawers
            //validar nombre
            check('name','el nombre es obligatori').not().isEmpty(),
            //validar email
            check('email','el email es obligatori').isEmail(),
             //validar password
            check('password','el password es obligatorio').isLength({min:6}),
            validarCampos
             ],createRegister)


router.get('/validate',ValidateJWT, validateToken)

module.exports = {router}