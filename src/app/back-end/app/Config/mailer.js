const nodemailer = require ('nodemailer');
const { promise } = require('protractor');
const { resolve } = require('path');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })
  //for using in other modules sendMail()
module.exports = {
    sendMail(from,to,subject,html){
        return new Promise((resolve,reject)=>{
            transporter.sendMail({from,subject,to,html},(err,info)=>{
               if(err) reject(err)

               resolve(info)
           }) 
        })
    }
}