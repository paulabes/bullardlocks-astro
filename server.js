// server.js
// Express backend to receive form data and send SMS via Twilio

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3001;

// Replace with your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_TWILIO_AUTH_TOKEN';
const twilioNumber = process.env.TWILIO_NUMBER || 'YOUR_TWILIO_PHONE_NUMBER';
const targetNumber = '+447809887883'; // International format for UK

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-sms', async (req, res) => {
  try {
    const { name, phone, carMake, carModel, carYear, reg, service } = req.body;
    const message = `Auto Locksmith Enquiry:\nService: ${service}\nName: ${name}\nPhone: ${phone}\nCar: ${carMake} ${carModel} (${carYear})\nReg: ${reg}`;

    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: targetNumber
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`SMS server running on port ${port}`);
});
