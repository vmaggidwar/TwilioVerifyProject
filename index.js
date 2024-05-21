import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import pkg from 'twilio';
const { Twilio } = pkg;

const app = express();
app.use(bodyParser.json());

const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
const authToken = 'XXXXXXXXXXXXXXXXXXXXXX'; // Your Auth Token from www.twilio.com/console
const verifyServiceSid = 'XXXXXXXXXXXXXXXXXXXXXX'; // Your Verify Service SID from www.twilio.com/console

const client = new Twilio(accountSid, authToken);

// Endpoint to start verification
app.post('/start-verify', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.status(200).send(verification);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to check verification code
app.post('/check-verify', async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    const verificationCheck = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks
      .create({ to: phoneNumber, code });

    res.status(200).send(verificationCheck);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve static files
app.use(express.static(path.join(path.resolve(), 'public')));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
