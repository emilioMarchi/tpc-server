const router = require('express').Router()
const nodemailer = require('nodemailer')
const {google} = require('googleapis')

router.post('/send-email', (req,res) => {

    console.log(req.body)
    const {userName,userEmail,userQuery} = req.body
    const contentMessage = `
    <div>
        <p>Nombre:${userName}</p>
        <p>Email de remitente:${userEmail}</p>
        
        <p>Mensaje: ${userQuery}</p>
    </div>
    `
    const CLIENT_ID='319091560892-r7bin6287o7fng86sb2j4op31hfm0nls.apps.googleusercontent.com'
    const CLIENT_SECRET='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'
  
    const REDIRECT_URI='https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN='1//04UYhq6FTyG2OCgYIARAAGAQSNwF-L9IrglrvX9qUQZqDaj8GY8_TH13RuIyFWH4f48-c7d6UM6MqWAYSs0JS8yq_9D9uMF8CUZM'
    
    
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
        
    const sendMail = async ()=> {
        try{
            const accessToken = oAuth2Client.setCredentials({
                refresh_token: REFRESH_TOKEN
            })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                tls: {
                    rejectUnauthorized: false
                },
                auth:{
                    type: 'OAuth2',
                    user: 'emiliomarchi.dev@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken:accessToken
                }
            })
            const mailOptions = {
                from:'mensaje desde emiliomarchi.dev',
                to:'tpcagencia@gmail.com',
                subject:'Mensaje',
                html: contentMessage
            }

            const result = await transporter.sendMail(mailOptions)
            return result
        }
        catch(err){
            console.log(err)
        }

    }
    sendMail()
    .then((res)=>{console.log(res)})
    .catch(error=>console.log(error.message))
    
    res.send(contentMessage)
})

module.exports=router