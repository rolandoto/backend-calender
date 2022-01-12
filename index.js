const  express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()
const {router} = require('./routes/Routes')
//varible de ambiente


//bases de datos 

dbConnection()

//crear el servidor  de express
const app = express()

app.use(cors())

app.use(express.static('public'))

//para recibir la informacion por la peticion
app.use(express.json())

app.use('/api/auth' ,router)

//escuchar peticion 
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en locashost${4000} `)
})

