const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Update with your email service provider
  auth: {
    user: 'psymon240@gmail.com', // Update with your email address
    pass: 'lpghseyolqgpvukg', // Update with your email password
  },
});

// Function to send the order email
const sendOrderEmail = (email, orderData) => {
  const mailOptions = {
    from: 'psymon240@gmail.com', // Update with your email address
    to: email,
    subject: 'Order Confirmation',
    html: `
      <html>
      <body>
        <h2>Hello,</h2>
        <p>Here are the details of your purchase:</p>
        <p>Day: ${orderData.day}</p>
        <p>Seat: ${orderData.seat}</p>
        <p>Client: ${orderData.client}</p>
        <p>Email: ${orderData.email}</p>
        <p>Regards,</p>
        <p>Your Company</p>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendOrderEmail };