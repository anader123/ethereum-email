require('dotenv').config();
const nodemailer = require('nodemailer');

const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USERNAME,
    EMAIL_PASSWORD
} = process.env;

const email = async (count, address) => {
    let transporter = nodemailer.createTransport({
        service: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURE,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        }
    });

    console.log('hit')

    let info = {
        from: EMAIL_USERNAME,
        to: EMAIL_USERNAME,
        subject: 'Ethereum Contract Event Notification',
        text: `The count in the smart contract has been increased to ${count} by addresss ${address}`
    };

    transporter.sendMail(info, (error) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log('worked')
        }
    });
}

module.exports = {
    email
}