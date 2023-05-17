const express = require('express') 

const bodyparser = require('body-parser');
const path = require('path')
require('dotenv').config()
const cors = require('cors');


const app = express()
const port = process.env.PORT || 8080
const root = path.join(__dirname, 'build')
app.use(express.static(root))


//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let corsOptions = {
    origin: ['https://admin.escuelademusicabarrial.ar',
        'https://www.escuelademusicabarrial.ar','https://escuelademusicabarrial.ar',
        'http://localhost:3000','http://170.64.181.199','http://ec2-3-83-189-41.compute-1.amazonaws.com'], // Reemplazar con dominio
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


// Conexión a Base de datos


    
//import routes

const formRoute = require('./routes/formContact')
    
 

// routes

app.use('/', (req,res)=>{
    res.send('working...')
})
app.use('/contact', formRoute )
// route middlewares

app.listen(port, () => console.log(`App is live on port ${port}!`))