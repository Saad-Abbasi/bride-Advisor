const nodemailer = require ('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const { promise } = require('protractor');
const { resolve } = require('path');

var options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}
var transporter = nodemailer.createTransport(sgTransport(options));

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