const express = require('express') 
const connectDb = require('./mongoConnection')
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
    origin: ['https://trespuntocero.ar', 'https://admin.trespuntocero.ar',
        'https://170.64.161.159',
        'http://localhost:3000'], // Reemplazar con dominio
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


// Conexión a Base de datos
connectDb()

    
//import routes

const formRoute = require('./routes/formContact')
const emailRoute = require('./routes/emailRoute')
    
 

// routes


app.use('/contact', formRoute )
app.use('/message', emailRoute )
// route middlewares

app.listen(port, () => console.log(`App is live on port ${port}!`))