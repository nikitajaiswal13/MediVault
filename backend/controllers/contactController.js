const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `mediVault Mail : ${process.env.EMAIL}`,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `Contact Form Submission from ${name}`,
      text: message
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (err) {
    console.error('Error sending contact email:', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to send contact email'
    });
  }
};