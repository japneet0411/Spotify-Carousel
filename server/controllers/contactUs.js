const mailgun = require("mailgun-js");
require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export const contactUs = async (req, res) => {
  const data = {
    from: process.env.MAILGUN_API_EMAIL,
    to: process.env.SUPPORT_EMAIL,
    subject: "Feedback: " + req.body.email + " : " + req.body.name,
    text: req.body.feedback,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};
