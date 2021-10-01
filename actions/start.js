const { sendImage, sendButtons, sendLocation, sendText, sendFilePDF, sendContact, sendContactList, sendVoice, sendVideo} = require('../actions/response');

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
    if (message.body === 'PDF' || message.body === 'pdf') {
      sendFilePDF( client, message );
    }
    if (message.body === 'Contacto' || message.body === 'contacto') {
      sendContact( client, message );
    }
    if (message.body === 'Lista Contactos' || message.body === 'lista contactos') {
      sendContactList( client, message );
    }
    if (message.body === 'Audio' || message.body === 'audio') {
      sendVoice( client, message );
    }
    if (message.body === 'Video' || message.body === 'video') {
      sendVideo( client, message );
    }
  });
}


module.exports = {
  start,
}