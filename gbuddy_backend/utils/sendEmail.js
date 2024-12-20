const nodemailer = require('nodemailer');
require("dotenv").config();

const EMAIL_USER='gowthamlearn6@gmail.com'
const EMAIL_PASS=process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;