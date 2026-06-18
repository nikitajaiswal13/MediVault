const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const validator = require('validator');


exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const safeName = validator.escape(name || '');
  const safeEmail = validator.normalizeEmail(email || '');
  const safeMessage = validator.escape(message || '');

  try {

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL, 
      subject: `Contact Form from ${safeName}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong> ${safeMessage}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: "Email sent"
    });

    if(!safeName || !safeEmail || !safeMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed"
    });
  }
};