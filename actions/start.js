const { sendImage, sendButtons, sendLocation, sendText } = require('../actions/response');

const start = (client) => {
  client.onMessage( async (message) => {

    if (message.body === 'hola' || message.body === 'Hola') {
      sendText( client, message )
    }
    
    if (message.body === 'Ubicacion' || message.body === 'ubicacion') {
      sendLocation( client, message )
    }
    
    if (message.body === 'Opciones' || message.body === 'opciones') {
      sendButtons( client, message );
    }
    if (message.body === 'Imagen' || message.body === 'imagen') {
      sendImage( client, message )
    }
  });
}


module.exports = {
  start,
}