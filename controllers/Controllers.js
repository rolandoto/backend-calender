const {response} = require('express')
const usuario = require('../model/usuario')
const bcryptjs = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

const createRegister =async (req,res= response)=>{

    const {email,password} = req.body
    
    try {
       
        let total = await usuario.findOne({email})
        //condicion  del correo si  ya esta disponible
        if(total){
            return res.status(401).json({
                ok:false,
                msg:'elija otro usuario este correo ya esta registado'
            })
        }
        //instancia para enviar la informacion como el name,correo,password
         let  per =   usuario(req.body)

        //guarda la informacion
        //encritar contraseña
        let salt = bcryptjs.genSaltSync()
        per.password = bcryptjs.hashSync(password,salt)

        await per.save()
        
        const token = await generarJWT(per.id,per.name)

        res.status(201).json({
            ok:true,
            uid:per.id,
            name:per.name,
            telefono:per.telefono,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:""
        })
    }
}

const  loginUsuario = async(req,res)=>{
   
    const {email,password} = req.body 

    try {
        //aqui me trae name,emial.password
       
        const Usuario = await usuario.findOne({email})
        //validator in the password what is database 
    
        //condicion  del correo si  ya esta disponible
        if(!Usuario){
            return res.status(401).json({
                msg:'este usuario no existe'
            })
        }

        //esto es para comparar el codigo encriptado en el monogdb con el password
        const validPassword = bcryptjs.compareSync(password,Usuario.password)
        
        if(!validPassword){
            return res.status(401).json({
                msg:"password incorrect"
            })
        }

        const token = await generarJWT(Usuario.id,Usuario.name)

        return res.status(201).json({
            ok:true,
            token,
            user:{
                id:Usuario.id,
                name:Usuario.name,
                email:Usuario.email,
                telefono:Usuario.telefono
            }
        })
               
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"comunicate con el adminstrador"
        })
    }   
  
}

const validateToken =async(req,res)=>{
   

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid,name)

    res.json({
        ok:true,
        message:'token',
        uid,
        name,
        token
    })
}



module.exports = {
    createRegister,
    loginUsuario,
    validateToken
}