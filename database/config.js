const {connect} = require('mongoose')

const dbConnection = () =>{
   
      const db = connect(process.env.URI)
      .then(() =>{
          console.log('db connection perfect')
      }).catch(() =>{
          console.log('error en connection')
      })

      return db
}

module.exports = {dbConnection}