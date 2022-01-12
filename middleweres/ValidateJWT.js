const {response} = require('express')
const  jwt = require('jsonwebtoken')
const ValidateJWT =(req,res=response,next) =>{

    const token = req.header('x-token')

    if(!jwt){
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion    '
        })
    }

    try {
        const {uid,name} = jwt.verify(token,process.env.SECRETE_JWT_SEED)
        
        req.uid = uid
        req.name= name

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"token no valido"
        })
    }

    next()

}



module.exports= {ValidateJWT}