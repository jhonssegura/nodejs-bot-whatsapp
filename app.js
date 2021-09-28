// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage( async (message) => {

    // Send basic text
    await client
    .sendText(message.from, '👋 Bienvenido!')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })

    
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });

    if (message.body === 'Ubicacion' || message.body === 'ubicacion') {
      await client
        // Send location
        .sendLocation(message.from, '-13.6561589', '-69.7309264', 'Brasil')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body === 'Opciones' || message.body === 'opciones') {
      // Send Messages with Buttons Reply
      const buttons = [
        {
          "buttonText": {
            "displayText": "Text of Button 1"
            }
          },
        {
          "buttonText": {
            "displayText": "Text of Button 2"
            }
          }
        ]
      await client.sendButtons(message.from, 'Title', buttons, 'Description')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

