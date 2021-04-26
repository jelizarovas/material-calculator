const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors")({
  origin: true,
});

admin.initializeApp();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: ,
//     pass: ,
//   },
// });

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "undoboard@gmail.com",
      pass: "redPig55",
    },
  })
);

exports.sendmail = functions.firestore.document("abhs/{jobId}").onCreate(() => {
  const mailOptions = {
    from: "***********",
    to: "jelizarovas@gmail.com",
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

exports.emailMessage = functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    const { name, email, phone, message } = JSON.parse(req.body);
    var text = `<div>
        <h4>Information</h4>
        <ul>
          <li>
            Name - ${name || ""}
          </li>
          <li>
            Email - ${email || ""}
          </li>
          <li>
            Phone - ${phone || ""}
          </li>
        </ul>
        <h4>Message</h4>
        <p>${message || ""}</p>
      </div>`;
    var sesAccessKey = "undoboard@gmail.com";
    var sesSecretKey = "redPig55";

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: sesAccessKey,
          pass: sesSecretKey,
        },
      })
    );
    const mailOptions = {
      to: "jelizarovas@gmail.com",
      from: "no-reply@jelizarovas.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
      }
      res.status(200).send({
        status: "success",
        name,
        email,
        phone,
        message,
      });
    });
  });
});
