const {Schema,model} = require('mongoose')

const ususuariSchema = Schema({
     name:{
         type:String,
         require:true
     },
     email:{
        type:String,
        require:true,
        unique:true
     },
     password:{
          type:String,
          require:true
         },
     telefono:{
          type:Number,
          require:true
         }
})

module.exports= model('Usuario',ususuariSchema)


