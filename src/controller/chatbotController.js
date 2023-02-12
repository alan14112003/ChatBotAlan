require('dotenv').config()

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN
const VERIFY_TOKEN = process.env.VERIFY_TOKEN

const getHomepage = (req, res) => {
  return res.send('Hê lô')
}

const getWebhook = (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

const postWebhook = (req, res) => {
  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(entry => {

      let webhook_event = entry.messaging[0]
      console.log(webhook_event)

      let sender_psid = webhook_event.sender_id
      console.log('Sender PSID: ' + sender_psid)
    })
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}

const handleMessage = (sender_psid, received_message) => {

}

// Handles messaging_postbacks events
const handlePostback = (sender_psid, received_postback) => {

}

// Sends response messages via the Send API
const callSendAPI = (sender_psid, response) => {
  
}

module.exports = {
  getHomepage,
  getWebhook,
  postWebhook
}