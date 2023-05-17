const router = require('express').Router()

const UserQuery = require('../mongoModels/queryModel')


router.post('/new-query', async (req,res) => {
    try{
        console.log(req.body)
        const {userName, userEmail, userQuery,} = req.body
        const newQuery = new UserQuery({
            userName,
            userEmail,
            userQuery,
            queryDate: new Date()
        })
        await UserQuery.create(newQuery)
   
        res.json({state:'staisfactory', msj:'Su consulta fue enviada con éxito'})
        res.status(200)
    }
    catch{
        console.log('error')
        res.json({state:'negative', msj:'Hubo un error, vuelva a intentarlo'})
        res.status(500)
    }
})

module.exports=router