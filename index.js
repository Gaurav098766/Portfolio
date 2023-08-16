const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const bodyparser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');  


require('dotenv').config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth:{
            api_key: process.env.SENDGRID_API_KEY,
        },
    })
)

app.post('/sendemail',(req,res)=>{
    const {name,email,jobtypes,message} = req.body;

    if(!name){
        return res.status(400).json({error:"Please add your NAME"})
    }
    if(!email){
        return res.status(400).json({error:"Please add your EMAIL"})
    }
    if(!jobtypes){
        return res.status(400).json({error:"Please add JOBTYPES"})
    }
    if(!message){
        return res.status(400).json({error:"Please add MESSAGE"})
    }
    transporter.sendMail({
        to: "gaurav1223344@gmail.com",
        from:"gsharma0070@gmail.com",
        subject:"Job Offers",
        html:`
                <h5>Details Information:</h5>
                    <ul>
                        <li><p>Name:${name}</p></li>
                        <li><p>Email:${email}</p></li>
                        <li><p>Job Types:${jobtypes}</p></li>
                        <li><p>Message:${message}</p></li>
                    </ul>
            `

    });
    res.json({success: "Your e-mail has been sent"})
})



app.listen(PORT,(req,res) =>{
    console.log("Server Started");
})