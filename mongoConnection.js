const mongoose = require('mongoose')
require('dotenv').config()

const uri = `mongodb+srv://emiliomarchidev:${process.env.MONGO_PASS}@cluster0.y67nkeh.mongodb.net/`;
const connectDb = async ()=>{ 
    await mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
}

module.exports=connectDb