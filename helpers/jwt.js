const jwt = require('jsonwebtoken')

const generarJWT =(uid,name)=>{
    
    return new Promise((resolve,reject) =>{

        const payload ={uid,name}
    
        jwt.sign(payload,process.env.SECRETE_JWT_SEED,{
            expiresIn:"4h"
        },(error,token)=>{
            if(error){
                console.log(error)
                reject('no se pudo generar el token')
            }

            resolve(token)
        })

    })
}

module.exports ={generarJWT}