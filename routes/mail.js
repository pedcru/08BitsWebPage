/**
 * Created by pcruz93 on 26/09/16.
 */
var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var config = require("./../config");
var router = express.Router();

/* POST mail listing. */
router.post('/', handleSendMail); // handle the route at 08bits.com/mail

function handleSendMail(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    //Prueba de los datos que recibe del formulario
    //res.json({data: name + ' ' + email + ' ' + phone + ' ' + message});

    //var transporter = nodemailer.createTransport(config.smtps);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'mail.08bits@gmail.com',
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: '1/B_Y4GSMCD8sKJf_7_UrLMlD2NYG_J9TksPT4L-nZmPO5q4JekuzXm9-NdtpsJeod'
            })
        }
    });

    //var text = 'Ha recibido nueva información de este contacto: ' + name + ' ' + email + ' ' + phone + ' ' + message;

    var mailOptions = {
        from: 'mail.08bits@gmail.com', // sender address
        to: '08bits.team@gmail.com', // list of receivers
        subject: 'Nuevo contacto', // Subject line
        //text: text //, // plaintext body
         html: '<b>Ha recibido información de este contacto:</b><br>'
         + '<b>Nombre: </b>'   + name +  '<br>'
         + '<b>Correo: </b>'   + email + '<br>'
         + '<b>Teléfono: </b>' + phone + '<br>'
         + '<b>Mensaje: </b>'  + message + '<br>'// You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            //console.log(error);
            //res.json({data: 'error'});
        }else{
            //console.log('Message sent: ' + info.response);
            //res.json({data: info.response});
            res.end("done");
        };
    });
}

module.exports = router;