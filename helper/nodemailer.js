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
function receiveMail(subject, body, image){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ectyapp@gmail.com',
            pass: 'desertfox' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'Admin',
        to: `ectyapp@gmail.com`,
        subject: `${subject}`,
        html: ` Name : ${body.username},
        Image: ${image},
        User ID: ${body.id},
        Email : ${body.email}
        Please press <a href=https://ecty-backend.herokuapp.com/verification/ktp-approve/${body.id}> Approve </a> to Approve verification KTP.

        Please press <a href=https://ecty-backend.herokuapp.com/verification/ktp-disapprove/${body.id}> Disapprove </a> to disapprove verification KTP`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error,'error receive mail +++++++++++++++');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {sendMail, receiveMail}