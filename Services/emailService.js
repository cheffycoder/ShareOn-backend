const nodemailer = require('nodemailer');

/* 
    Now, after importing
    We will make a function sendMail which will require some data in it.

    This will include --> from, to, subject, text, html

    If we are sending html then text will be ignored and if no html is sent then text will be read.

    Let's go to files.js in Routes to create a route.
*/

async function sendMail({from, to, subject, text, html}){

    /* 
        Now, we have to do the config of node mailer.
        Creating a transporter object from nodemailer.createTransport();
        Inside createTransport function of nodemailer we have to create an object.
        This is basically setting up the SMTP: Simple mail Transfer protocol.

        We could have used gmail, its free tire also comes, and if we are using some hosting provider then
        it gives us smtp credentials.
        Or else we can use some third party services like sancrede, sendinBlue, mailgun etc.

        In here we will be using sendinBlue 3rd party app.

        Register and then go to SMTP instead of API keys.
        And it will give us all the SMTP settings that we need.
    
    */
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    
    // Basic configuration is done and now we have to send the mail. Thus, making a variable.
    /* This sendMail is a method provided to us by the nodemailer library. Our sendMail Function is different */
    let info = await transporter.sendMail({
        from: `ShareOn<${from}>`,
        to,
        subject,
        text,
        html,
    });

    // console.log(info);

    // An error is encountered which says cannot destructure property uuid of req.body as it is undefined
    // This tells us that the req body is empty.
    /* 
        Express server by default never expects JSON data format in requests body, 
        Thus, we have to explicitly tell express that the body is containing JSON data and please receive it.
        To do this we will enable JSON parse feature of express.
        Let's go to server.js and do
        app.use(express.json());


        This is a middleware of express that enables JSON data format to be readable by express server.
    */
}


module.exports = sendMail;