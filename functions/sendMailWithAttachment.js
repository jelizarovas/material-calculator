const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

//google account credentials used to send email
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "undoboardgmail.com",
    pass: "redPig55",
  },
});

exports.sendEmail = functions.firestore.document("abhs/{jobId}").onCreate((snap, context) => {
  const mailOptions = {
    from: "***********",
    to: "jelizarovas@gmail.com", //snap.data().email,
    subject: "contact form message",
    html: "<h1>Order Confirmation</h1>",
  };

  return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Sent!");
  });
});

exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
  const mailOptions = {
    from: "•••••••••@gmail.com",
    to: req.body.email,
    subject: "contact form message",
    html: `<h1>Order Confirmation</h1>
                            <p>
                               <b>Email: </b>${req.body.email}<br>
                            </p>`,
  };

  return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      return res.send(error.toString());
    }
    return res.send(`Sent! ${JSON.stringify(data)}`);
  });
});
