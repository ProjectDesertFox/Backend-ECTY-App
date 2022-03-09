const nodemailer = require('nodemailer')

function sendMail(email, subject, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ectyapp@gmail.com',
            pass: 'desertfox' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'ectyapp@gmail.com',
        to: `${email}`,
        subject: `${subject}`,
        text: `${body}`,
        //html: `Please press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email. Thanks`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
function receiveMail(subject, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'desertfox.pet@gmail.com',
            pass: 'desertFox08' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'desertfox.pet@gmail.com',
        to: `ectyapp@gmail.com`,
        subject: `${subject}`,
        text: `${body}`,
        //html: `Please press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email. Thanks`
    };

    transporter.receiveMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {sendMail, receiveMail}