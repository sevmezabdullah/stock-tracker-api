const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const handlebars = require('handlebars');
const fs = require('fs');

dotenv.config();

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "mail.taskpeer.xyz",
        port: 465,
        auth: {
            user: "info@taskpeer.xyz",
            pass: "32410668gG..,"
        }
    })
    const mailOptions = {
        from: "info@taskpeer.xyz",
        to,
        subject,
        text,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                    background-color: #2196F3;
                    padding: 30px;
                    text-align: center;
                }
                .header img {
                    max-width: 150px;
                }
                .content {
                    padding: 40px 30px;
                    background-color: #ffffff;
                }
                .hero-image {
                    width: 100%;
                    max-width: 500px;
                    margin: 20px auto;
                    display: block;
                }
                .button {
                    display: inline-block;
                    padding: 15px 30px;
                    background-color: #FF5722;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-align: center;
                }
                .footer {
                    background-color: #f9f9f9;
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #eeeeee;
                }
                .social-links {
                    margin: 15px 0;
                }
                .social-links a {
                    margin: 0 10px;
                    color: #666;
                    text-decoration: none;
                }
                h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 28px;
                }
                h2 {
                    color: #333;
                    margin-top: 0;
                }
                p {
                    color: #666;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>TaskPeer</h1>
                </div>
                <div class="content">
                    <h2>${subject}</h2>
                    <p>${text}</p>
                    <a href="#" class="button">ÜCRETSİZ BAŞLA</a>
                </div>
                <div class="footer">
                    <div class="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Instagram</a>
                    </div>
                    <p>TaskPeer Inc.<br>
                    İstanbul, Türkiye</p>
                    <p>© ${new Date().getFullYear()} TaskPeer. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </body>
        </html>
        `
    }
    await transporter.sendMail(mailOptions)
}

const sendVerificationEmail = async (to, subject, name, token) => {

    const emailTemplate = fs.readFileSync('./src/template/email_verification.hbs', 'utf8')
    const template = handlebars.compile(emailTemplate)

    const html = template({ verifyLink: `http://localhost:3000/verify/${token}`, name: name })

    const transporter = nodemailer.createTransport({
        host: "mail.taskpeer.xyz",
        port: 465,
        auth: {
            user: "info@taskpeer.xyz",
            pass: "32410668gG..,"
        }
    })


    const mailOptions = {
        from: "info@taskpeer.xyz",
        to,
        subject,
        html: html
    }
    await transporter.sendMail(mailOptions)
}


module.exports = {
    sendEmail,
    sendVerificationEmail
}