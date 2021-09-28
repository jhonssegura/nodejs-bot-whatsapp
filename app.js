// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const fs = require('fs');

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      // console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'images/qt-code/qt.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => { 
    start(client);
  })
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
    if (message.body === 'Imagen' || message.body === 'imagen') {
      // Send and image
      await client
      .sendImage(
        message.from,
        'images/response.jpg',
        'image-name',
        'Caption text'
      )
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
  });
}

